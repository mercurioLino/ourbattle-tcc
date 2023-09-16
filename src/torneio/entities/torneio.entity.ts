import { Equipe } from 'src/equipe/entities/equipe.entity';
import { Jogo } from 'src/jogo/entities/jogo.entity';
import { Partida } from 'src/partida/entities/partida.entity';
import { Jogador } from 'src/usuario/entities/jogador.entity';
import { Organizacao } from 'src/usuario/entities/organizacao.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'tipo' } })
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
  premiacao: number;

  @Column()
  regras: string;

  @Column()
  qtdParticipantes: number;

  @Column()
  status: 'Inscrições Abertas' | 'Em Andamento' | 'Concluído';

  @Column()
  tipo: 'equipe' | 'individual';

  @ManyToMany(() => Equipe, () => Jogador)
  participantes: Equipe | Jogador;

  @ManyToOne(() => Jogo, (jogo) => jogo.torneios, {
    eager: true,
  })
  jogo: Jogo;

  @ManyToOne(() => Organizacao, (organizacao) => organizacao.torneios, {
    eager: true,
  })
  organizacao: Organizacao;

  @ManyToOne(() => Equipe, {
    eager: true,
  })
  vencedor: Equipe;

  @ManyToMany(() => Equipe, {
    eager: true,
  })
  @JoinTable()
  equipes: Equipe[];

  @OneToMany(() => Partida, (partida) => partida.torneio, {
    eager: true,
  })
  partidas: Partida[];
}
