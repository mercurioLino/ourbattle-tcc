import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipeModule } from 'src/equipe/equipe.module';
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
  ],
  controllers: [TorneioController],
  providers: [TorneioService],
  exports: [TypeOrmModule],
})
export class TorneioModule {}
