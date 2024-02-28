import { IsOptional } from 'class-validator';
import { Partida } from 'src/partida/entities/partida.entity';
import { Torneio } from 'src/torneio/entities/torneio.entity';
import { Jogador } from 'src/usuario/entities/jogador.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Equipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  @IsOptional()
  pontuacao: number;

  @OneToMany(() => Jogador, (jogador) => jogador.equipe, {
    onDelete: 'CASCADE',
  })
  jogadores: Jogador[];

  @ManyToMany(() => Partida)
  @JoinTable({ name: 'equipes_por_partida' })
  partidas: Partida[];

  @ManyToMany(() => Torneio)
  @JoinTable({ name: 'equipes_por_torneio' })
  torneios: Torneio[];
}
