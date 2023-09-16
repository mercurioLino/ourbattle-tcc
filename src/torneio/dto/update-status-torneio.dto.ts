import { IsDefined, IsNotEmpty } from 'class-validator';

export class UpdateStatusTorneioDto {
  @IsDefined()
  @IsNotEmpty()
  status: 'Inscrições Abertas' | 'Em Andamento' | 'Concluído';
}
