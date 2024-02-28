import { PartialType } from '@nestjs/mapped-types';
import { CreateTorneioDto } from './create-torneio.dto';

export class UpdateTorneioDto extends PartialType(CreateTorneioDto) {}
