import { Evento } from './Evento';
import { RedeSocial } from './RedeSocial';
import { UserUpdate } from '@app/models/identity/UserUpdate';

export interface Palestrante {
  id: number;
  miniCurriculo: string;
  user: UserUpdate;
  redesSociais: RedeSocial[];
  palestrantesEventos: Evento[];
}
