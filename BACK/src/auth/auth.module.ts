import { Module, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EquipeModule } from 'src/equipe/equipe.module';
import { JogoModule } from 'src/jogo/jogo.module';
import { PartidaModule } from 'src/partida/partida.module';
import { TorneioModule } from 'src/torneio/torneio.module';
import { JogadorService } from 'src/usuario/services/jogador.service';
import { OrganizacaoService } from 'src/usuario/services/organizacao.service';
import { UsuarioService } from 'src/usuario/services/usuario.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './estrategies/jwt.strategy';
import { LocalStrategy } from './estrategies/local.strategy';

@Module({
  imports: [
    forwardRef(() => UsuarioModule),
    forwardRef(() => TorneioModule),
    forwardRef(() => PartidaModule),
    forwardRef(() => JogoModule),
    forwardRef(() => EquipeModule),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '24h' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsuarioService,
    OrganizacaoService,
    JogadorService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
