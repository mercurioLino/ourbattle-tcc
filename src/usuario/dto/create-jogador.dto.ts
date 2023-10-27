import { IsString, MaxLength } from 'class-validator';
import { Role } from 'src/enums/role.enum';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';

export class CreateJogadorDto extends CreateUsuarioDto {
  @IsString()
  @MaxLength(16)
  nickname: string;

  @IsString()
  nome: string;

  role: Role = Role.Jogador;
}
