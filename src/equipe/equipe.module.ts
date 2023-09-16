import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuario/services/usuario.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { Equipe } from './entities/equipe.entity';
import { EquipeController } from './equipe.controller';
import { EquipeService } from './equipe.service';
import { TorneioModule } from 'src/torneio/torneio.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Equipe]),
    forwardRef(() => UsuarioModule),
    forwardRef(() => TorneioModule),
  ],
  controllers: [EquipeController],
  providers: [EquipeService, UsuarioService],
  exports: [TypeOrmModule],
})
export class EquipeModule {}
