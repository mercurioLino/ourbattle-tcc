import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';
import { Jogador } from 'src/usuario/entities/jogador.entity';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { CreateEquipeDto } from './dto/create-equipe.dto';
import { UpdateEquipeDto } from './dto/update-equipe.dto';
import { Equipe } from './entities/equipe.entity';

@Injectable()
export class EquipeService {
  constructor(
    @InjectRepository(Equipe) private repository: Repository<Equipe>,
    @InjectRepository(Jogador) private repositoryJogador: Repository<Jogador>,
  ) {}

  create(createEquipeDto: CreateEquipeDto) {
    const equipe: Equipe = this.repository.create(createEquipeDto);
    equipe.pontuacao = 0;
    return this.repository.save(equipe);
  }

  async findAll(
    options: IPaginationOptions,
    search?: string,
  ): Promise<Pagination<Equipe>> {
    const where: FindManyOptions<Equipe> = {};
    if (search) {
      where.where = [{ nome: ILike(`%${search}%`) }];
    }

    return paginate<Equipe>(this.repository, options, where);
  }

  async findOne(id: number): Promise<Equipe> {
    const equipe = await this.repository.findOneBy({ id });

    if (!equipe) {
      throw new RecordNotFoundException();
    }
    return equipe;
  }

  async update(id: number, updateEquipeDto: UpdateEquipeDto): Promise<Equipe> {
    await this.repository.update(id, updateEquipeDto);
    const equipe = await this.repository.findOneBy({ id });
    if (!equipe) {
      throw new RecordNotFoundException();
    }
    return equipe;
  }

  async remove(id: number) {
    const equipe = await this.repository.findOneBy({ id });
    if (!equipe) {
      throw new RecordNotFoundException();
    }
    equipe.jogadores.forEach((jogador) => {
      jogador.equipe = null;
    });
    return this.repository.delete(id);
  }

  async addJogador(id: number, relationEntityDto: RelationEntityDto) {
    const equipe = await this.repository.findOneBy({ id });
    console.log(equipe);
    if (!equipe) {
      throw new RecordNotFoundException();
    }

    const jogador = await this.repositoryJogador.findOneBy({
      id: relationEntityDto.id,
    });

    if (!jogador) {
      throw new RecordNotFoundException();
    }

    if (jogador.equipe != null && jogador.equipe.id == equipe.id) {
      throw new Error("O jogador já está inscrito nesta equipe")
    } else if(jogador.equipe != null){
      throw new Error("O jogador já está inscrito em uma equipe")
    }

    jogador.equipe = equipe;

    return await this.repositoryJogador.save(jogador);
  }

  async removeJogador(id: number, relationEntityDto: RelationEntityDto) {
    const jogador = await this.repositoryJogador.findOneBy({
      id: relationEntityDto.id,
    });

    if (!jogador) {
      throw new RecordNotFoundException();
    }

    if (jogador.equipe == null) {
      throw new Error("O jogador já não está inserido em uma equipe")
    }

    jogador.equipe = null;

    return await this.repositoryJogador.save(jogador);
  }
}
