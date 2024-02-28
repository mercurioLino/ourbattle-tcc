import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuario/services/usuario.service';
import { Jogo } from './entities/jogo.entity';
import { JogoController } from './jogo.controller';
import { JogoService } from './jogo.service';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Jogo]), forwardRef(() => UsuarioModule)],
  controllers: [JogoController],
  providers: [JogoService, UsuarioService],
  exports: [TypeOrmModule, JogoService],
})
export class JogoModule {}
