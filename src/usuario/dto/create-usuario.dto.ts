import { IsEmail, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;
}
