import { Jogador } from "./jogador.model";
import { Partida } from "./partida.model";
import { Torneio } from "./torneio.model";

export interface Equipe {
  id: number;
  nome: string;
  jogadores: Jogador[];
  partidas: Partida[];
  torneios: Torneio[];

}
