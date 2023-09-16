import { Equipe } from 'src/equipe/entities/equipe.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ChildEntity, Column, ManyToOne } from 'typeorm';

@ChildEntity()
export class Jogador extends Usuario {
  @Column()
  nome: string;

  @Column()
  nickname: string;

  @Column()
  pontuacao: number;

  @ManyToOne(() => Equipe, (equipe) => equipe.jogadores, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  equipe?: Equipe | null;
}
