import { Type } from 'class-transformer';
import { IsDateString, IsDefined, IsString } from 'class-validator';
import { RelationEntityDto } from 'src/shared/relation-entity.dto';
import { Torneio } from 'src/torneio/entities/torneio.entity';

export class CreatePartidaDto {
  @IsDateString()
  data: string;

  @IsString()
  hora: string;

  @IsDefined()
  @Type(() => RelationEntityDto)
  torneio: Torneio;
}
