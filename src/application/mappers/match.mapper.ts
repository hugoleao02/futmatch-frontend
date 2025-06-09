import type { Partida } from '../../domain/entities/Partida';
import type { MatchDTO, CreateMatchDTO, UpdateMatchDTO } from '../dtos/match.dto';

export class MatchMapper {
  static toDTO(match: Partida): MatchDTO {
    return {
      id: match.id,
      titulo: match.titulo,
      data: match.data.toISOString(),
      local: match.local,
      maxJogadores: match.maxJogadores,
      jogadoresAtuais: match.jogadoresAtuais,
      status: match.status,
      criadorId: match.criadorId
    };
  }

  static toDomain(dto: CreateMatchDTO): Omit<Partida, 'id'> {
    return {
      titulo: dto.titulo,
      data: new Date(dto.data),
      local: dto.local,
      maxJogadores: dto.maxJogadores,
      jogadoresAtuais: 0,
      status: 'agendada',
      criadorId: '', // TODO: Implementar
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  static toUpdate(dto: UpdateMatchDTO): Partial<Partida> {
    return {
      ...dto,
      data: dto.data ? new Date(dto.data) : undefined,
      updatedAt: new Date()
    };
  }
}