import { IsDefined, IsNotEmpty } from 'class-validator';
import { StatusTorneio } from 'src/enums/status-torneio.enum';

export class UpdateStatusTorneioDto {
  @IsDefined()
  @IsNotEmpty()
  status: StatusTorneio;
}
