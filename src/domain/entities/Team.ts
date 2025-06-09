import type { User } from './User';

export interface Team {
  nome: string;
  jogadores: User[];
}
