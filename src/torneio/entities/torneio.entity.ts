import { Equipe } from 'src/equipe/entities/equipe.entity';
import { Jogo } from 'src/jogo/entities/jogo.entity';
import { Partida } from 'src/partida/entities/partida.entity';
import { Organizacao } from 'src/usuario/entities/organizacao.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['nome'])
export class Torneio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  data: string;

  @Column()
  hora: string;

  @Column()
  premiacao: string;

  @Column()
  regras: string;

  // @Column()
  // @IsOptional()
  // qtdParticipantes?: number;

  @Column()
  status: 'Inscrições Abertas' | 'Em Andamento' | 'Concluído' | 'Cancelar';

  @ManyToMany(() => Equipe)
  @JoinTable({ name: 'equipes_por_torneio' })
  equipes?: Equipe[];

  @ManyToOne(() => Jogo, {
    eager: true,
  })
  jogo: Jogo;

  @ManyToOne(() => Organizacao, {
    onDelete: 'SET NULL',
    eager: true,
  })
  organizacao: Organizacao;

  @ManyToOne(() => Equipe, {
    eager: true,
  })
  vencedor?: Equipe;

  @OneToMany(() => Partida, (partida) => partida.torneio)
  partidas?: Partida[];
}
