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
import { CreateJogoDto } from './dto/create-jogo.dto';
import { UpdateJogoDto } from './dto/update-jogo.dto';
import { JogoService } from './jogo.service';

@Controller('jogo')
export class JogoController {
  constructor(private readonly jogoService: JogoService) {}

  @Post()
  create(@Body() createJogoDto: CreateJogoDto) {
    return this.jogoService.create(createJogoDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.jogoService.findAll({ page, limit }, search);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jogoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJogoDto: UpdateJogoDto,
  ) {
    return this.jogoService.update(id, updateJogoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.jogoService.remove(id);
  }

  @Patch(':id/alterar-status')
  changeStatus(@Param('id', ParseIntPipe) id: number) {
    return this.jogoService.changeStatus(id);
  }
}
