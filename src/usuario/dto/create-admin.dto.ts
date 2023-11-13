import { Role } from 'src/enums/role.enum';
import { CreateUsuarioDto } from './create-usuario.dto';

export class CreateAdminDto extends CreateUsuarioDto {
  role: Role = Role.Admin;
}
