import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jogo } from './entities/jogo.entity';
import { JogoController } from './jogo.controller';
import { JogoService } from './jogo.service';

@Module({
  controllers: [JogoController],
  providers: [JogoService],
  imports: [TypeOrmModule.forFeature([Jogo])],
  exports: [TypeOrmModule],
})
export class JogoModule {}
