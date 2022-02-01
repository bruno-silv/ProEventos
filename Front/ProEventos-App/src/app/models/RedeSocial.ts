import { Evento } from "./Evento";
import { Palestrante } from "./Palestrante";

export interface RedeSocial {

  id: string;
  nome: string;
  URL: string;
  eventoId: number;
  palestranteId: number;

}
