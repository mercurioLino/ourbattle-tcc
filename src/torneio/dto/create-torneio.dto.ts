import { Type } from 'class-transformer';
import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { QuantidadeParticipantes } from 'src/enums/quantidade-participantes.enum';
import { Jogo } from 'src/jogo/entities/jogo.entity';
import { RelationEntityDto } from 'src/shared/relation-entity.dto';
import { Organizacao } from 'src/usuario/entities/organizacao.entity';

export class CreateTorneioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsDateString()
  data: string;

  @IsString()
  hora: string;

  @IsString()
  premiacao: string;

  @IsString()
  regras: string;

  @IsDefined()
  @Type(() => RelationEntityDto)
  organizacao: Organizacao;

  @IsDefined()
  @ValidateNested()
  @Type(() => RelationEntityDto)
  jogo: Jogo;

  @IsEnum(QuantidadeParticipantes)
  qtdParticipantes: QuantidadeParticipantes;

  // @ValidateNested()
  // @Type(() => CreatePartidaDto)
  // partidas: Partida[];
}
