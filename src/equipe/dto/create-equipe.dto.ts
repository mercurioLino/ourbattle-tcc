import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateEquipeDto {
  @IsString()
  @ApiProperty({ example: 'Equipe Teste 1' })
  nome: string;
}
