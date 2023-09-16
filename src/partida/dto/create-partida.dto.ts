import { IsDateString, IsString } from 'class-validator';

export class CreatePartidaDto {
  @IsDateString()
  data: string;

  @IsString()
  hora: string;
}
