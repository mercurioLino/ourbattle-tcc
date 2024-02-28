import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Equipe } from './equipe/entities/equipe.entity';
import { EquipeModule } from './equipe/equipe.module';
import { Jogo } from './jogo/entities/jogo.entity';
import { JogoModule } from './jogo/jogo.module';
import { Partida } from './partida/entities/partida.entity';
import { PartidaModule } from './partida/partida.module';
import { Torneio } from './torneio/entities/torneio.entity';
import { TorneioModule } from './torneio/torneio.module';
import { Admin } from './usuario/entities/admin.entity';
import { Jogador } from './usuario/entities/jogador.entity';
import { Organizacao } from './usuario/entities/organizacao.entity';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/ourbattle.db',
      entities: [Equipe, Jogo, Partida, Torneio, Usuario, Jogador, Organizacao, Admin],
      synchronize: true,
    }),
    UsuarioModule,
    TorneioModule,
    PartidaModule,
    EquipeModule,
    JogoModule,
    AuthModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
