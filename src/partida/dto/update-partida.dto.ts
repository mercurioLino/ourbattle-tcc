import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { Equipe } from 'src/equipe/entities/equipe.entity';
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';
import { CreatePartidaDto } from './create-partida.dto';

export class UpdatePartidaDto extends PartialType(CreatePartidaDto) {
  @IsDefined()
  @ValidateNested()
  @Type(() => RelationEntityDto)
  vencedor: Equipe;
}
