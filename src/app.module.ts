import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Equipe } from './equipe/entities/equipe.entity';
import { EquipeModule } from './equipe/equipe.module';
import { Jogo } from './jogo/entities/jogo.entity';
import { JogoModule } from './jogo/jogo.module';
import { Partida } from './partida/entities/partida.entity';
import { PartidaModule } from './partida/partida.module';
import { Torneio } from './torneio/entities/torneio.entity';
import { TorneioModule } from './torneio/torneio.module';
import { Jogador } from './usuario/entities/jogador.entity';
import { Organizacao } from './usuario/entities/organizacao.entity';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/ourbattle.db',
      entities: [Equipe, Jogo, Partida, Torneio, Usuario, Jogador, Organizacao],
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
