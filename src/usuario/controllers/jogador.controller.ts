import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateJogadorDto } from '../dto/create-jogador.dto';
import { UpdateJogadorDto } from '../dto/update-jogador.dto';
import { JogadorService } from '../services/jogador.service';

@Controller('jogador')
export class JogadorController {
  constructor(private readonly jogadorService: JogadorService) {}

  @Post()
  create(@Body() createJogadorDto: CreateJogadorDto) {
    return this.jogadorService.create(createJogadorDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.jogadorService.findAll({ page, limit }, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jogadorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJogadorDto: UpdateJogadorDto) {
    return this.jogadorService.update(+id, updateJogadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jogadorService.remove(+id);
  }
}
