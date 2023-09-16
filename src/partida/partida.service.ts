import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreatePartidaDto } from './dto/create-partida.dto';
import { UpdatePartidaDto } from './dto/update-partida.dto';
import { Partida } from './entities/partida.entity';

@Injectable()
export class PartidaService {
  constructor(
    @InjectRepository(Partida) private repository: Repository<Partida>,
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
}
