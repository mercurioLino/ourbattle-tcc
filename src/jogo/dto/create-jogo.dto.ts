import { IsEnum, IsString } from 'class-validator';
import JogoStatus from 'src/enums/status-jogo.enum';

export class CreateJogoDto {
  @IsString()
  nome: string;

  @IsString()
  categoria: string;

  @IsString()
  regras: string;

  @IsEnum(JogoStatus)
  status: JogoStatus = JogoStatus.Habilitado;
}
