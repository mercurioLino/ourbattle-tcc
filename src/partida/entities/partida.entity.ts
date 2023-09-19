import { Equipe } from 'src/equipe/entities/equipe.entity';
import { Torneio } from 'src/torneio/entities/torneio.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Partida {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: string;

  @Column()
  hora: string;

  @ManyToMany(() => Equipe)
  @JoinTable({ name: 'equipes_por_partida' })
  equipes: Equipe[];

  @ManyToOne(() => Torneio, { eager: true })
  torneio: Torneio;
}
