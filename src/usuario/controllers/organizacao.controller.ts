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
import { CreateOrganizacaoDto } from '../dto/create-organizacao.dto';
import { UpdateOrganizacaoDto } from '../dto/update-organizacao.dto';
import { OrganizacaoService } from '../services/organizacao.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Organização')
@Controller('organizacao')
@UseGuards(RolesGuard)
export class OrganizacaoController {
  constructor(private readonly organizacaoService: OrganizacaoService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createOrganizacaoDto: CreateOrganizacaoDto) {
    return this.organizacaoService.create(createOrganizacaoDto);
  }

  @Get()
  @IsPublic()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.organizacaoService.findAll({ page, limit }, search);
  }

  @Get(':id')
  @IsPublic()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.organizacaoService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Organizacao)
  update(
    @Param('id') id: string,
    @Body() updateOrganizacaoDto: UpdateOrganizacaoDto,
  ) {
    return this.organizacaoService.update(+id, updateOrganizacaoDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.organizacaoService.remove(id);
  }
}
