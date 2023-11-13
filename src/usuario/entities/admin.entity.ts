import { ChildEntity } from "typeorm";
import { Usuario } from 'src/usuario/entities/usuario.entity';

@ChildEntity() 
export class Admin extends Usuario{
}
