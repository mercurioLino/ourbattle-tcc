import { Role } from 'src/enums/role.enum';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'tipo' } })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  role: Role;
  /*
  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
  */
}
