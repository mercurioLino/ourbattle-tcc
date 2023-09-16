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

  @OneToMany(() => Torneio, (torneio) => torneio.jogo)
  torneios: Torneio[];
}
