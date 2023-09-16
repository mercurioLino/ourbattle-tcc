import { IsString } from 'class-validator';

export class CreateEquipeDto {
  @IsString()
  nome: string;
}
