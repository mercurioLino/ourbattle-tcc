import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IsPublic } from 'src/shared/dto/decorator';
import { CurrentUser } from 'src/shared/dto/decorator/current-user.decorator';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

// @ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@CurrentUser() user: Usuario) {
    return this.authService.login(user);
  }

  @Get('user')
  getUser(@CurrentUser() user: Usuario) {
    return user;
  }
}
