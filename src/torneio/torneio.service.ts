import { RecordNotFoundException } from '@exceptions';
import { StatusIrregularException } from '@exceptions/irregular-status.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { shuffle } from 'lodash';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { FasesChaveamento } from 'src/enums/fases-chaveamento.enum';
import { QuantidadeParticipantes } from 'src/enums/quantidade-participantes.enum';
import { StatusJogo } from 'src/enums/status-jogo.enum';
import { StatusOrganizacao } from 'src/enums/status-organizacao.enum';
import { StatusTorneio } from 'src/enums/status-torneio.enum';
import { Equipe } from 'src/equipe/entities/equipe.entity';
import { EquipeService } from 'src/equipe/equipe.service';
import { Jogo } from 'src/jogo/entities/jogo.entity';
import { JogoService } from 'src/jogo/jogo.service';
import { Partida } from 'src/partida/entities/partida.entity';
import { RelationEntityDto } from 'src/shared/relation-entity.dto';
import { OrganizacaoService } from 'src/usuario/services/organizacao.service';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreatePartidaDto } from './../partida/dto/create-partida.dto';
import { CreateTorneioDto } from './dto/create-torneio.dto';
import { UpdateTorneioDto } from './dto/update-torneio.dto';
import { Torneio } from './entities/torneio.entity';

@Injectable()
export class TorneioService {
  constructor(
    @InjectRepository(Torneio) private repository: Repository<Torneio>,
    @InjectRepository(Equipe) private repositoryEquipe: Repository<Equipe>,
    @InjectRepository(Jogo) private repositoryJogo: Repository<Jogo>,
    @InjectRepository(Partida) private repositoryPartida: Repository<Partida>,
    private readonly jogoService: JogoService,
    private readonly organizacaoService: OrganizacaoService,
    private readonly equipeService: EquipeService,
  ) {}

  // {
  //   "nome": "torneio teste",
  //   "data": "2023-10-23",
  //   "hora": "12:00",
  //   "premiacao":"trinquenta real",
  //   "regras": "nao pode mata nao pode roba nao pode xinga o amigo",
  //   "organizacao": "3",
  //   "jogo": "2",
  //   "qtdParticipantes": "8"
  // }

  async create(createTorneioDto: CreateTorneioDto) {
    const torneio: Torneio = this.repository.create(createTorneioDto);
    const jogo = await this.jogoService.findOne(createTorneioDto.jogo.id);
    const organizacao = await this.organizacaoService.findOne(
      createTorneioDto.organizacao.id,
    );
    console.log(organizacao);
    if (jogo.status === StatusJogo.Desabilitado) {
      throw new StatusIrregularException();
    }
    if (organizacao.status === StatusOrganizacao.Inativa) {
      throw new StatusIrregularException();
    }
    torneio.status = StatusTorneio.InscricoesAbertas;
    return this.repository.save(torneio);
  }

  async findAll(
    options: IPaginationOptions,
    search?: string,
  ): Promise<Pagination<Torneio>> {
    const where: FindOptionsWhere<Torneio> = {};

    if (search) {
      where.jogo = ILike(`%${search}%`);
    }

    return paginate<Torneio>(this.repository, options, { where });
  }

  async findOne(id: number) {
    const torneio = await this.repository.findOneBy({ id });

    if (!torneio) {
      throw new RecordNotFoundException();
    }

    return torneio;
  }

  async update(
    id: number,
    updateTorneioDto: UpdateTorneioDto,
  ): Promise<Torneio> {
    await this.repository.update(id, updateTorneioDto);
    const torneio = await this.repository.findOneBy({ id });

    if (!torneio) {
      throw new RecordNotFoundException();
    }

    return torneio;
  }

  async addEquipe(id: number, relationEntityDto: RelationEntityDto) {
    const torneio: Torneio = await this.findOne(id);
    const equipe = await this.equipeService.findOne(relationEntityDto.id);
    if (
      torneio.equipes.some((equipeinscrita) => equipeinscrita.id === equipe.id)
    ) {
      return 'Equipe ja está inscrita no torneio'; // lançar erro
    }
    if (torneio.status === StatusTorneio.InscricoesEncerradas) {
      return (
        'Este torneio já atingiu o número máximo de ' +
        torneio.qtdParticipantes +
        ' inscritos' // lançar errro
      );
    }
    torneio.equipes.push(equipe);
    if (torneio.equipes.length == torneio.qtdParticipantes) {
      torneio.status = StatusTorneio.InscricoesEncerradas;
    }

    return this.repository.save(torneio);
  }

  async remove(id: number) {
    const torneio = await this.repository.findOneBy({ id });
    if (!torneio) {
      throw new RecordNotFoundException();
    }

    return this.repository.delete(id);
  }

  async start(id: number, createPartidaDto: CreatePartidaDto) {
    const torneio = await this.findOne(id);
    if (torneio.status != StatusTorneio.InscricoesEncerradas) {
      return (
        'O status atual de ' +
        torneio.status +
        ' do torneio não permite que ele seja iniciado'
      );
    }
    // passar como erro ao inves de return 200
    const mapeamentoFases = {
      [QuantidadeParticipantes.TrintaeDois]: FasesChaveamento.Chave32,
      [QuantidadeParticipantes.Dezesseis]: FasesChaveamento.Oitavas,
      [QuantidadeParticipantes.Oito]: FasesChaveamento.Quartas,
    };
    torneio.fase = mapeamentoFases[torneio.qtdParticipantes];

    const equipes = shuffle(torneio.equipes);
    let idOrdinal = 1;
    while (equipes.length >= 2) {
      const partida = this.repositoryPartida.create(createPartidaDto);
      partida.equipes = [];
      partida.equipes.push(equipes.shift());
      partida.equipes.push(equipes.shift());
      partida.torneio = torneio;
      partida.idOrdinal = idOrdinal;
      partida.fase = torneio.fase;
      idOrdinal++;
      await this.repositoryPartida.save(partida);
    }
    torneio.status = StatusTorneio.EmAndamento;
    return await this.repository.save(torneio);
  }

  async declararVencedor(id: number, relationEntityDto: RelationEntityDto) {
    const torneio = await this.repository.findOneBy({ id });
    if (!torneio) {
      throw new RecordNotFoundException();
    }
    const equipe = await this.repositoryEquipe.findOneBy({
      id: relationEntityDto.id,
    });
    if (!equipe) {
      throw new RecordNotFoundException();
    }

    if (!torneio.equipes.map((v) => v.id).includes(equipe.id)) {
      return 'Jogador não está inscrito no torneio para ser declarado como vencedor';
    }

    torneio.vencedor = equipe;
    equipe.pontuacao += 1;
    this.repositoryEquipe.save(equipe);
    return this.repository.save(torneio);
  }
}
