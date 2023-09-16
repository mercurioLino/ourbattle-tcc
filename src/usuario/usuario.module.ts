import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipeModule } from 'src/equipe/equipe.module';
import { PartidaModule } from 'src/partida/partida.module';
import { TorneioModule } from 'src/torneio/torneio.module';
import { JogadorController } from './controllers/jogador.controller';
import { OrganizacaoController } from './controllers/organizacao.controller';
import { Jogador } from './entities/jogador.entity';
import { Organizacao } from './entities/organizacao.entity';
import { Usuario } from './entities/usuario.entity';
import { JogadorService } from './services/jogador.service';
import { OrganizacaoService } from './services/organizacao.service';
import { UsuarioService } from './services/usuario.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Organizacao, Jogador]),
    forwardRef(() => TorneioModule),
    forwardRef(() => EquipeModule),
    forwardRef(() => PartidaModule),
  ],
  controllers: [JogadorController, OrganizacaoController],
  providers: [UsuarioService, JogadorService, OrganizacaoService],
  exports: [TypeOrmModule],
})
export class UsuarioModule {}
