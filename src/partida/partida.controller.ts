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
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/role.guard';
import { IsPublic } from 'src/shared/dto/decorator';
import { Roles } from 'src/shared/dto/decorator/roles.decorator';
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';
import { CreatePartidaDto } from './dto/create-partida.dto';
import { UpdatePartidaDto } from './dto/update-partida.dto';
import { PartidaService } from './partida.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Partida')
@Controller('partida')
@UseGuards(RolesGuard)
export class PartidaController {
  constructor(private readonly partidaService: PartidaService) {}

  @Post()
  @Roles(Role.Organizacao, Role.Admin)
  create(@Body() createPartidaDto: CreatePartidaDto) {
    return this.partidaService.create(createPartidaDto);
  }

  @Post(':id/declarar-vencedor')
  @Roles(Role.Organizacao, Role.Admin)
  declararVencedor(
    @Param('id', ParseIntPipe) id: number,
    @Body() relationEntityDto: RelationEntityDto,
  ) {
    return this.partidaService.declararVencedor(id, relationEntityDto);
  }

  @Get()
  @IsPublic()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.partidaService.findAll({ page, limit }, search);
  }

  @Get(':id')
  @IsPublic()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.partidaService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Organizacao, Role.Admin)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updatePartidaDto: UpdatePartidaDto,
  ) {
    return this.partidaService.update(id, updatePartidaDto);
  }

  @Delete(':id')
  @Roles(Role.Organizacao, Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.partidaService.remove(id);
  }
}
