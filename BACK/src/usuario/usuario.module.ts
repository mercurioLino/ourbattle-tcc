import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipeModule } from 'src/equipe/equipe.module';
import { PartidaModule } from 'src/partida/partida.module';
import { TorneioModule } from 'src/torneio/torneio.module';
import { AdminController } from './controllers/admin.controller';
import { JogadorController } from './controllers/jogador.controller';
import { OrganizacaoController } from './controllers/organizacao.controller';
import { Admin } from './entities/admin.entity';
import { Jogador } from './entities/jogador.entity';
import { Organizacao } from './entities/organizacao.entity';
import { Usuario } from './entities/usuario.entity';
import { AdminService } from './services/admin.service';
import { JogadorService } from './services/jogador.service';
import { OrganizacaoService } from './services/organizacao.service';
import { UsuarioService } from './services/usuario.service';
;

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Organizacao, Jogador, Admin]),
    forwardRef(() => TorneioModule),
    forwardRef(() => EquipeModule),
    forwardRef(() => PartidaModule),
  ],
  controllers: [JogadorController, OrganizacaoController, AdminController],
  providers: [UsuarioService, JogadorService, OrganizacaoService, AdminService],
  exports: [TypeOrmModule, OrganizacaoService],
})
export class UsuarioModule {}
