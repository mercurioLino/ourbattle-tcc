import { RecordNotFoundException } from '@exceptions';
import { StatusIrregularException } from '@exceptions/irregular-status.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { StatusJogo } from 'src/enums/status-jogo.enum';
import { Equipe } from 'src/equipe/entities/equipe.entity';
import { Jogo } from 'src/jogo/entities/jogo.entity';
import { Partida } from 'src/partida/entities/partida.entity';
import { RelationEntityDto } from 'src/shared/relation-entity.dto';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateTorneioDto } from './dto/create-torneio.dto';
import { UpdateStatusTorneioDto } from './dto/update-status-torneio.dto';
import { UpdateTorneioDto } from './dto/update-torneio.dto';
import { Torneio } from './entities/torneio.entity';

@Injectable()
export class TorneioService {
  constructor(
    @InjectRepository(Torneio) private repository: Repository<Torneio>,
    @InjectRepository(Equipe) private repositoryEquipe: Repository<Equipe>,
    @InjectRepository(Jogo) private repositoryJogo: Repository<Jogo>,
    @InjectRepository(Partida) private repositoryPartida: Repository<Partida>,
  ) {}

  async create(createTorneioDto: CreateTorneioDto) {
    const torneio: Torneio = this.repository.create(createTorneioDto);
    torneio.jogo = createTorneioDto.jogo;
    const jogo = await this.repositoryJogo.findOneBy({
      id: createTorneioDto.jogo.id,
    });
    if (jogo.status === StatusJogo.Desabilitado) {
      throw new StatusIrregularException();
    }
    torneio.status = `Inscrições Abertas`;
    //torneio.qtdParticipantes = 16;
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

  // async addEquipe(id: number, relationEntityDto: RelationEntityDto) {
  //   const torneio: Torneio = await this.repository.findOneBy({ id });
  //   if (!torneio) {
  //     throw new RecordNotFoundException();
  //   }
  //   const equipe = await this.repositoryEquipe.findOneBy({
  //     id: relationEntityDto.id,
  //   });
  //   if (!equipe) {
  //     throw new RecordNotFoundException();
  //   }
  //   torneio.equipes.push(equipe);
  //   return this.repository.save(torneio);
  // }

  async remove(id: number) {
    const torneio = await this.repository.findOneBy({ id });
    if (!torneio) {
      throw new RecordNotFoundException();
    }

    return this.repository.delete(id);
  }

  async alterarStatus(
    id: number,
    updateStatusTorneioDto: UpdateStatusTorneioDto,
  ) {
    const torneio = await this.repository.findOneBy({ id });
    if (!torneio) {
      throw new RecordNotFoundException();
    }

    torneio.status = updateStatusTorneioDto.status;
    return this.repository.save(torneio);
  }
  // async gerarPartida(id: number, createPartidaDto: CreatePartidaDto) {
  //   const torneio = await this.findOne(id);

  //   for (let partida of torneio.partidas) {
  //     this.repositoryPartida.delete(partida.id);
  //   }

  //   const jogadoresInscritos = [...torneio.equipes];
  //   if (jogadoresInscritos.length < 16) {
  //     return 'Não há jogadores suficientes inscritos para gerar as partidas';
  //   }

  //   for (let i = 0; i < 8; i++) {
  //     const partida = this.repositoryPartida.create(createPartidaDto);
  //     partida.equipes = [];
  //     partida.torneio = torneio;
  //     for (let j = 0; j < 2; j++) {
  //       const indexJogador = Math.floor(
  //         Math.random() * jogadoresInscritos.length,
  //       );
  //       partida.equipes.push(jogadoresInscritos[indexJogador]);
  //       jogadoresInscritos.splice(indexJogador, 1);
  //     }
  //     await this.repositoryPartida.save(partida);
  //   }
  //   return this.findOne(id);
  // }

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
