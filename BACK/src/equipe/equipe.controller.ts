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
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/role.guard';
import { IsPublic } from 'src/shared/dto/decorator';
import { Roles } from 'src/shared/dto/decorator/roles.decorator';
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';
import { CreateEquipeDto } from './dto/create-equipe.dto';
import { UpdateEquipeDto } from './dto/update-equipe.dto';
import { EquipeService } from './equipe.service';

@ApiTags('Equipe')
@Controller('equipe')
@UseGuards(RolesGuard)
export class EquipeController {
  constructor(private readonly equipeService: EquipeService) {}

  @Post()
  @IsPublic()
  //@Roles(Role.Admin, Role.Jogador)
  create(@Body() createEquipeDto: CreateEquipeDto) {
    return this.equipeService.create(createEquipeDto);
  }

  @Get()
  @IsPublic()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.equipeService.findAll({ page, limit }, search);
  }

  @Get(':id')
  @IsPublic()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.equipeService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Jogador)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEquipeDto: UpdateEquipeDto,
  ) {
    return this.equipeService.update(id, updateEquipeDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.equipeService.remove(id);
  }

  @Post(':id/add-jogador')
  @IsPublic()
  //@Roles(Role.Admin, Role.Jogador)
  addJogador(
    @Param('id', ParseIntPipe) id: number,
    @Body() relationEntityDto: RelationEntityDto,
  ) {
    return this.equipeService.addJogador(id, relationEntityDto);
  }  

  @Post(':id/remove-jogador')
  @IsPublic()
  //@Roles(Role.Admin, Role.Jogador)
  remmoveJogador(
    @Param('id', ParseIntPipe) id: number,
    @Body() relationEntityDto: RelationEntityDto,
  ) {
    return this.equipeService.removeJogador(id, relationEntityDto);
  }  
}