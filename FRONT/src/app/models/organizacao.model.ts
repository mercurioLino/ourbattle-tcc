import { Torneio } from './torneio.model';
import { User } from './user.model';
export interface Organizacao extends User{
  nome: string;
  status: string;
  torneios: Torneio[];
}
