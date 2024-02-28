import { Equipe } from "./equipe.model";
import { Partida } from "./partida.model";
import { Torneio } from "./torneio.model";
import { User } from './user.model';

export interface Jogador extends User{
  nome: string;
  nickname: string;
  equipe: Equipe;
  partidas: Partida[];
  torneios: Torneio[];
}
