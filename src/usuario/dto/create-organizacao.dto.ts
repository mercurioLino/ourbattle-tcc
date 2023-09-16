import { IsString } from 'class-validator';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';

export class CreateOrganizacaoDto extends CreateUsuarioDto {
  @IsString()
  nome: string;
}
