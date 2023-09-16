import { Module } from '@nestjs/common';
import { Jogo } from './entities/jogo.entity';
import { JogoController } from './jogo.controller';
import { JogoService } from './jogo.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [JogoController],
  providers: [JogoService],
  imports: [TypeOrmModule.forFeature([Jogo])],
})
export class JogoModule {}
