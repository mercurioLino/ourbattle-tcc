import { FasesChaveamento } from 'src/enums/fases-chaveamento.enum';
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

  @ManyToMany(() => Equipe, {
    eager: true,
  })
  @JoinTable({ name: 'equipes_por_partida' })
  equipes: Equipe[];

  @ManyToOne(() => Torneio)
  torneio: Torneio;

  @Column()
  idOrdinal: number;

  @Column()
  fase: FasesChaveamento;
}
