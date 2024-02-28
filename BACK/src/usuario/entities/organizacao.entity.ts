import { StatusOrganizacao } from 'src/enums/status-organizacao.enum';
import { Torneio } from 'src/torneio/entities/torneio.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ChildEntity, Column, OneToMany } from 'typeorm';

@ChildEntity()
export class Organizacao extends Usuario {
  @Column()
  nome: string;

  @Column({ default: StatusOrganizacao.Ativa })
  status: StatusOrganizacao;

  @OneToMany(() => Torneio, (torneio) => torneio.jogo)
  torneios: Torneio[];
}
