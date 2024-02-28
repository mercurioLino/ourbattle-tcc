import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuarioService } from 'src/usuario/services/usuario.service';

import { UserPayload } from '../models/user-payload.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usuarioService: UsuarioService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  async validate(payload: UserPayload): Promise<any> {
    try {
      return await this.usuarioService.findOne(payload.sub);
    } catch (e) {
      throw new UnauthorizedException('User not found');
    }
  }
}
