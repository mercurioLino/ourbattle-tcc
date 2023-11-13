import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { FasesChaveamento } from 'src/enums/fases-chaveamento.enum';
import { Equipe } from 'src/equipe/entities/equipe.entity';
import { EquipeService } from 'src/equipe/equipe.service';
import { Torneio } from 'src/torneio/entities/torneio.entity';
import { TorneioService } from 'src/torneio/torneio.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { RelationEntityDto } from './../shared/dto/relation-entity.dto';
import { CreatePartidaDto } from './dto/create-partida.dto';
import { UpdatePartidaDto } from './dto/update-partida.dto';
import { Partida } from './entities/partida.entity';

@Injectable()
export class PartidaService {
  constructor(
    @InjectRepository(Partida) private repository: Repository<Partida>,
    @InjectRepository(Equipe) private repositoryEquipe: Repository<Equipe>,
    @InjectRepository(Torneio) private repositoryTorneio: Repository<Torneio>,
    private readonly torneioService: TorneioService,
    private readonly equipeService: EquipeService,
  ) {}

  create(createPartidaDto: CreatePartidaDto) {
    const partida: Partida = this.repository.create(createPartidaDto);
    return this.repository.save(partida);
  }

  async findAll(
    options: IPaginationOptions,
    search?: string,
  ): Promise<Pagination<Partida>> {
    const where: FindOptionsWhere<Partida> = {};
    return paginate<Partida>(this.repository, options, { where });
  }

  async findOne(id: number) {
    const partida = await this.repository.findOneBy({ id });
    if (!partida) {
      throw new RecordNotFoundException();
    }
    return partida;
  }

  async update(
    id: number,
    updatePartidaDto: UpdatePartidaDto,
  ): Promise<Partida> {
    await this.repository.update(id, updatePartidaDto);
    const partida = await this.repository.findOneBy({ id });
    if (!partida) {
      throw new RecordNotFoundException();
    }
    return partida;
  }

  async remove(id: number) {
    const partida = await this.repository.findOneBy({ id });
    if (!partida) {
      throw new RecordNotFoundException();
    }
    return this.repository.delete(id);
  }

  async declararVencedor(id: number, relationEntityDto: RelationEntityDto) {
    const partida = await this.repository.findOneBy({ id });
    if (!partida) {
      throw new RecordNotFoundException();
    }
    const equipeVencedora = await this.equipeService.findOne(
      relationEntityDto.id,
    );

    if (
      !partida.equipes.find(
        (equipePartida) => equipePartida.id === equipeVencedora.id,
      )
    ) {
      return 'Equipe não está cadastrada na partida para ser declarada como vencedora';
    }

    const partidaTorneio = await this.repository
      .createQueryBuilder('partida')
      .leftJoinAndSelect('partida.torneio', 'torneio')
      .where('partida.id = :id', { id })
      .getOne();

    partida.vencedor = equipeVencedora;
    if (partida.fase === FasesChaveamento.Final) {
      const torneio = await this.torneioService.findOne(
        partidaTorneio.torneio.id,
      );
      torneio.vencedor = equipeVencedora;
      equipeVencedora.pontuacao += 2;
      this.repositoryTorneio.save(torneio);
    }
    equipeVencedora.pontuacao++;
    this.repositoryEquipe.save(equipeVencedora);
    return this.repository.save(partida);
  }
}
