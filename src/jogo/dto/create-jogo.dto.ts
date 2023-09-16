import { IsString } from 'class-validator';

export class CreateJogoDto {
  @IsString()
  nome: string;

  @IsString()
  categoria: string;

  @IsString()
  regras: string;
}
