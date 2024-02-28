import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private repository: Repository<Usuario>,
  ) {}

  async findOne(id: number) {
    const usuario = await this.repository.findOneBy({ id });

    if (!usuario) {
      throw new RecordNotFoundException();
    }

    return usuario;
  }

  async findByEmail(email: string, includePassowrd = false): Promise<Usuario> {
    const usuario = await this.repository
      .createQueryBuilder('usuario')
      .addSelect('usuario.password')
      .where('usuario.email = :email', { email })
      .getOne();

    if (includePassowrd) {
      return usuario;
    } else {
      const { password, ...result } = usuario;
      return result as Usuario;
    }
  }
}
