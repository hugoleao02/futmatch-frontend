import type { AuthenticatedUser } from '../../domain/entities/User';
import type { AuthResponseDTO } from '../dtos/auth.dto';

export class AuthMapper {
  static toDomain(dto: AuthResponseDTO): AuthenticatedUser {
    return {
      id: dto.user.id,
      nome: dto.user.nome,
      email: dto.user.email,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'user',
      permissions: [],
      preferences: {
        theme: 'light',
        language: 'pt',
        notifications: {
          email: true,
          push: true,
          sms: false,
          inApp: true,
          matchReminders: true,
          roomInvitations: true,
          newMessages: true,
        },
        privacy: {
          profileVisibility: 'public',
          showEmail: false,
          showLocation: false,
          allowFriendRequests: true,
          allowRoomInvitations: true,
        },
      },
    };
  }

  static toDTO(user: AuthenticatedUser): AuthResponseDTO {
    return {
      token: '', // TODO: Implementar geração de token
      refreshToken: '', // TODO: Implementar geração de refresh token
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
    };
  }
}
