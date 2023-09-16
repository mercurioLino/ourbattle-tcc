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
import { RelationEntityDto } from 'src/shared/relation-entity.dto';
import { CreateTorneioDto } from './dto/create-torneio.dto';
import { UpdateStatusTorneioDto } from './dto/update-status-torneio.dto';
import { UpdateTorneioDto } from './dto/update-torneio.dto';
import { TorneioService } from './torneio.service';

@Controller('torneio')
export class TorneioController {
  constructor(private readonly torneioService: TorneioService) {}

  @Post()
  //@IsPublic()
  createTorneioEquipe(@Body() createTorneioDto: CreateTorneioDto) {
    return this.torneioService.create(createTorneioDto);
  }

  // @Post(':id/add-equipe')
  // //@Roles(Role.Admin, Role.Jogador)
  // addEquipe(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() relationEntityDto: RelationEntityDto,
  // ) {
  //   return this.torneioService.addEquipe(id, relationEntityDto);
  // }

  @Get()
  //@IsPublic()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.torneioService.findAll({ page, limit }, search);
  }

  @Get(':id')
  //@IsPublic()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.torneioService.findOne(id);
  }

  @Patch(':id')
  //@Roles(Role.Admin, Role.Organizacao)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateTorneioDto: UpdateTorneioDto,
  ) {
    return this.torneioService.update(id, updateTorneioDto);
  }

  @Delete(':id')
  //@Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.torneioService.remove(id);
  }

  @Post(':id/declarar-vencedor')
  //@Roles(Role.Admin, Role.Organizacao)
  declararVencedor(
    @Param('id', ParseIntPipe) id: number,
    @Body() relationEntityDto: RelationEntityDto,
  ) {
    return this.torneioService.declararVencedor(id, relationEntityDto);
  }

  @Post(':id/alterar-status')
  //@Roles(Role.Admin, Role.Organizacao)
  alterarStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusTorneio: UpdateStatusTorneioDto,
  ) {
    return this.torneioService.alterarStatus(id, updateStatusTorneio);
  }

  // @Post(':id/gerar-partidas')
  // //@Roles(Role.Admin, Role.Organizacao, Role.Funcionario)
  // gerarPartidasEquipes(
  //   @Param('id') id: number,
  //   @Body() createPartidaDto: CreatePartidaDto,
  // ) {
  //   return this.torneioService.gerarPartida(id, createPartidaDto);
  // }
}
