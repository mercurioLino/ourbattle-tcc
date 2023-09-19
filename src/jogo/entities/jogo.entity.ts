import { StatusJogo } from 'src/enums/status-jogo.enum';
import { Torneio } from 'src/torneio/entities/torneio.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Jogo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  categoria: string;

  @Column()
  regras: string;

  @Column()
  status: StatusJogo;

  @OneToMany(() => Torneio, (torneio) => torneio.jogo)
  torneios: Torneio[];
}
