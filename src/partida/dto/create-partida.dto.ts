import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class CreatePartidaDto {
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'A data deve estar no formato DD/MM/AAAA',
  })
  @ApiProperty({ example: '11/22/3333' })
  data: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'A hora deve estar no formato HH:MM',
  })
  @ApiProperty({ example: '12:34' })
  hora: string;
}
