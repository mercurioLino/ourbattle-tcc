import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { CreateJogadorDto } from '../dto/create-jogador.dto';
import { UpdateJogadorDto } from '../dto/update-jogador.dto';
import { Jogador } from '../entities/jogador.entity';

@Injectable()
export class JogadorService {
  constructor(
    @InjectRepository(Jogador) private repository: Repository<Jogador>,
  ) {}

  async create(createJogadorDto: CreateJogadorDto) {
    const jogador: Jogador = this.repository.create(createJogadorDto);
    jogador.role = 'jogador';
    return this.repository.save(jogador);
  }

  async findAll(
    options: IPaginationOptions,
    search?: string,
  ): Promise<Pagination<Jogador>> {
    const where: FindManyOptions<Jogador> = {};
    if (search) {
      where.where = [
        { nome: ILike(`%${search}%`) },
        { nickname: ILike(`%${search}%`) },
      ];
    }

    return paginate<Jogador>(this.repository, options, where);
  }

  async findOne(id: number) {
    const usuario = await this.repository.findOneBy({ id });

    if (!usuario) {
      throw new RecordNotFoundException();
    }

    return usuario;
  }

  async update(
    id: number,
    updateJogadorDto: UpdateJogadorDto,
  ): Promise<Jogador> {
    await this.repository.update(id, updateJogadorDto);
    const jogador = await this.repository.findOneBy({ id });
    if (!jogador) {
      throw new RecordNotFoundException();
    }
    return jogador;
  }

  async remove(id: number) {
    const jogador = await this.repository.findOneBy({ id });
    if (!jogador) {
      throw new RecordNotFoundException();
    }

    return this.repository.delete(id);
  }
}
