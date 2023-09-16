import { Equipe } from 'src/equipe/entities/equipe.entity';
import { Torneio } from 'src/torneio/entities/torneio.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'tipo' } })
export class Partida {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: string;

  @Column()
  hora: string;

  @ManyToMany(() => Equipe, {
    eager: true,
  })
  @JoinTable({ name: 'equipes_por_partida' })
  equipes: Equipe[];

  @ManyToOne(() => Equipe, {
    eager: true,
  })
  vencedor: Equipe;

  @ManyToOne(() => Torneio, (torneio) => torneio)
  torneio: Torneio;
}
