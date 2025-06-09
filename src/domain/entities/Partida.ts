import type { BaseEntity } from '@shared/types/common';

export type TipoPartida = 'PUBLICA' | 'PRIVADA';
export type StatusPartida = 'AGENDADA' | 'EM_ANDAMENTO' | 'FINALIZADA' | 'CANCELADA';

export class Partida implements BaseEntity {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    public readonly esporte: string,
    public readonly dataHora: Date,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly totalJogadores: number,
    public readonly tipoPartida: TipoPartida,
    public readonly status: StatusPartida,
    public readonly participantes: string[] = [],
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
  ) {}
}
