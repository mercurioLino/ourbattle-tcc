import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail()
  @IsString()
  @ApiProperty({ example: 'leonardo.gabriel@ufms.br' })
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ example: 'senha(sim, está sem RegEXP)' })
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  password: string;
}
