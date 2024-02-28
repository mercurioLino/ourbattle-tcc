import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipeModule } from 'src/equipe/equipe.module';
import { TorneioModule } from 'src/torneio/torneio.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { Partida } from './entities/partida.entity';
import { PartidaController } from './partida.controller';
import { PartidaService } from './partida.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Partida]),
    forwardRef(() => EquipeModule),
    forwardRef(() => TorneioModule),
    forwardRef(() => UsuarioModule),
  ],
  controllers: [PartidaController],
  providers: [PartidaService],
  exports: [TypeOrmModule, PartidaService],
})
export class PartidaModule {}
