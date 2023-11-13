import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/shared/dto/decorator/roles.decorator';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { AdminService } from '../services/admin.service';
import { UsuarioService } from '../services/usuario.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(RolesGuard)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.adminService.findAll({ page, limit }, search);
  }
}
