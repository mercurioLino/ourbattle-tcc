import { Equipe } from 'src/equipe/entities/equipe.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ChildEntity, Column, ManyToMany } from 'typeorm';

@ChildEntity()
export class Jogador extends Usuario {
  @Column()
  nome: string;

  @Column()
  nickname: string;

  @Column()
  pontuacao: number;

  @ManyToMany(() => Equipe, (equipe) => equipe.jogadores)
  equipe?: Equipe;
}
