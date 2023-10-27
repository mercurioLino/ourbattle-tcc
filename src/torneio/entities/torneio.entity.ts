import { FasesChaveamento } from 'src/enums/fases-chaveamento.enum';
import { QuantidadeParticipantes } from 'src/enums/quantidade-participantes.enum';
import { StatusTorneio } from 'src/enums/status-torneio.enum';
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

  @Column()
  qtdParticipantes: QuantidadeParticipantes;

  @Column()
  status: StatusTorneio = StatusTorneio.InscricoesAbertas;

  @Column({ nullable: true })
  fase?: FasesChaveamento;

  @ManyToMany(() => Equipe, {
    eager: true,
  })
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

  @OneToMany(() => Partida, (partida) => partida.torneio, {
    eager: true,
  })
  partidas?: Partida[];
}
