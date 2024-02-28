import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipeModule } from 'src/equipe/equipe.module';
import { JogoModule } from 'src/jogo/jogo.module';
import { PartidaModule } from 'src/partida/partida.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { Torneio } from './entities/torneio.entity';
import { TorneioController } from './torneio.controller';
import { TorneioService } from './torneio.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Torneio]),
    forwardRef(() => UsuarioModule),
    forwardRef(() => EquipeModule),
    forwardRef(() => PartidaModule),
    forwardRef(() => JogoModule),
  ],
  controllers: [TorneioController],
  providers: [TorneioService],
  exports: [TypeOrmModule, TorneioService],
})
export class TorneioModule {}
