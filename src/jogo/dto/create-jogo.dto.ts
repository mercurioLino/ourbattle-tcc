import { IsEnum, IsString } from 'class-validator';
import { StatusJogo } from 'src/enums/status-jogo.enum';

export class CreateJogoDto {
  @IsString()
  nome: string;

  @IsString()
  categoria: string;

  @IsString()
  regras: string;

  @IsEnum(StatusJogo)
  status: StatusJogo = StatusJogo.Habilitado;
}
