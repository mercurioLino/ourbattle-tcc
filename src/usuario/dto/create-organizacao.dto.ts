import { IsString } from 'class-validator';
import { Role } from 'src/enums/role.enum';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';

export class CreateOrganizacaoDto extends CreateUsuarioDto {
  @IsString()
  nome: string;

  role: Role = Role.Organizacao;
}
