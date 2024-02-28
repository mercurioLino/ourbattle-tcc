import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { QuantidadeParticipantes } from 'src/enums/quantidade-participantes.enum';
import { Jogo } from 'src/jogo/entities/jogo.entity';
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';
import { Organizacao } from 'src/usuario/entities/organizacao.entity';

export class CreateTorneioDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Torneio Teste 1' })
  nome: string;

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

  @IsString()
  @ApiProperty({ example: 2500 })
  premiacao: string;

  @IsString()
  @ApiProperty({
    example:
      'Somente Elos Iguais devem se enfrentar, proibído emprestar contas...',
  })
  regras: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => RelationEntityDto)
  @ApiProperty({ example: 'organizacao: {id: 1}' })
  organizacao: Organizacao;

  @IsDefined()
  @ValidateNested()
  @Type(() => RelationEntityDto)
  @ApiProperty({ example: 'jogo: {id: 1}' })
  jogo: Jogo;

  @IsEnum(QuantidadeParticipantes)
  @ApiProperty({ example: '8, 16 ou 32' })
  qtdParticipantes: QuantidadeParticipantes;

  // @ValidateNested()
  // @Type(() => CreatePartidaDto)
  // partidas: Partida[];
}
