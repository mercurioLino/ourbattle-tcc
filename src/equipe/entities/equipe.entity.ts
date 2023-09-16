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
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'tipo' } })
export class Equipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @IsOptional()
  pontuacao = 0;

  @OneToMany(() => Jogador, (jogador) => jogador.equipe, {
    onDelete: 'CASCADE',
    eager: true,
  })
  jogadores?: Jogador[];

  @ManyToMany(() => Partida)
  @JoinTable()
  partidas: Partida[];

  @ManyToMany(() => Torneio)
  @JoinTable()
  torneios: Torneio[];
}
