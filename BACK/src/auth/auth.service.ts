import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/services/usuario.service';
import { UserPayload } from './models/user-payload.model';
import { UserToken } from './models/user-token.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Usuario> {
    const user = await this.usuarioService.findByEmail(email, true);

    if (user) {
      const isPasswordValid = await compareSync(pass, user.password);
      if (isPasswordValid) {
        const { password, ...result } = user;
        return result as Usuario;
      }
    }
    return null;
  }

  async login(usuario: Usuario): Promise<UserToken> {
    const payload: UserPayload = {
      sub: usuario.id,
      email: usuario.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'Bearer',
    };
  }
}
