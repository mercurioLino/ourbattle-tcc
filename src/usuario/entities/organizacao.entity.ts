import { Torneio } from 'src/torneio/entities/torneio.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ChildEntity, Column, OneToMany } from 'typeorm';

@ChildEntity()
export class Organizacao extends Usuario {
  @Column()
  nome: string;

  @Column()
  status: 'Ativa' | 'Inativa';

  @OneToMany(() => Torneio, (torneio) => torneio.jogo)
  torneios: Torneio[];
}
