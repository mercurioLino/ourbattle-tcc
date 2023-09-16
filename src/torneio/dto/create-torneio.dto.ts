import { Type } from 'class-transformer';
import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
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

  @IsNumber()
  @IsPositive()
  premiacao: number;

  @IsString()
  regras: string;

  @IsDefined()
  @Type(() => RelationEntityDto)
  organizacao: Organizacao;

  @IsDefined()
  @Type(() => RelationEntityDto)
  jogo: Jogo;

  // @IsString()
  // tipo: 'Individual' | 'Equipe';
  /*
  @ValidateNested()
  @Type(() => CreatePartidaDto)
  partidas: Partida[];
  */
}
