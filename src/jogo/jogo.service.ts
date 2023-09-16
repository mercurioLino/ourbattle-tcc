import { Injectable } from '@nestjs/common';
import { CreateJogoDto } from './dto/create-jogo.dto';
import { UpdateJogoDto } from './dto/update-jogo.dto';
import { RecordNotFoundException } from '@exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Repository, FindManyOptions, ILike } from 'typeorm';
import { Jogo } from './entities/jogo.entity';

@Injectable()
export class JogoService {
  constructor(@InjectRepository(Jogo) private repository: Repository<Jogo>) {}

  create(createJogoDto: CreateJogoDto) {
    const jogo: Jogo = this.repository.create(createJogoDto);
    return this.repository.save(jogo);
  }

  async findAll(
    options: IPaginationOptions,
    search?: string,
  ): Promise<Pagination<Jogo>> {
    const where: FindManyOptions<Jogo> = {};
    if (search) {
      where.where = [
        { nome: ILike(`%${search}%`) },
        { categoria: ILike(`%${search}%`) },
      ];
    }

    return paginate<Jogo>(this.repository, options, where);
  }

  async findOne(id: number) {
    const jogo = await this.repository.findOneBy({ id });

    if (!jogo) {
      throw new RecordNotFoundException();
    }

    return jogo;
  }

  async update(id: number, updateJogoDto: UpdateJogoDto): Promise<Jogo> {
    await this.repository.update(id, updateJogoDto);
    const jogo = await this.repository.findOneBy({ id });
    if (!jogo) {
      throw new RecordNotFoundException();
    }
    return jogo;
  }

  async remove(id: number) {
    const jogo = await this.repository.findOneBy({ id });

    if (!jogo) {
      throw new RecordNotFoundException();
    }

    return this.repository.delete(id);
  }
}
