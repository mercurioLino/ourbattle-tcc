import { Equipe } from "./equipe.model";
import { Torneio } from "./torneio.model";

export interface Partida {
  id: number;
  data: string;
  hora: string;
  torneio: Torneio;
  equipe: Equipe[];
}
