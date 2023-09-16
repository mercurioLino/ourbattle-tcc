import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipeModule } from 'src/equipe/equipe.module';
import { Partida } from './entities/partida.entity';
import { PartidaController } from './partida.controller';
import { PartidaService } from './partida.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Partida]),
    forwardRef(() => EquipeModule),
  ],
  controllers: [PartidaController],
  providers: [PartidaService],
  exports: [TypeOrmModule],
})
export class PartidaModule {}
