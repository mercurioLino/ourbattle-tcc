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
import { CreateJogadorDto } from '../dto/create-jogador.dto';
import { UpdateJogadorDto } from '../dto/update-jogador.dto';
import { JogadorService } from '../services/jogador.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Jogador')
@Controller('jogador')
@UseGuards(RolesGuard)
export class JogadorController {
  constructor(private readonly jogadorService: JogadorService) {}

  @Post()
  @IsPublic()
  create(@Body() createJogadorDto: CreateJogadorDto) {
    return this.jogadorService.create(createJogadorDto);
  }

  @Get()
  @IsPublic()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.jogadorService.findAll({ page, limit }, search);
  }

  @Get(':id')
  @IsPublic()
  findOne(@Param('id') id: string) {
    return this.jogadorService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Jogador)
  update(@Param('id') id: string, @Body() updateJogadorDto: UpdateJogadorDto) {
    return this.jogadorService.update(+id, updateJogadorDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.jogadorService.remove(+id);
  }
}
