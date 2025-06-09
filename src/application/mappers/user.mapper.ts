import type { User } from '../../domain/entities/User';
import type { UserDTO, CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto';

export class UserMapper {
  static toDTO(user: User): UserDTO {
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      avatar: user.avatar,
      isEmailVerified: user.isEmailVerified,
      lastLoginAt: user.lastLoginAt?.toISOString()
    };
  }

  static toDomain(dto: CreateUserDTO): Omit<User, 'id'> {
    return {
      nome: dto.nome,
      email: dto.email,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  static toUpdate(dto: UpdateUserDTO): Partial<User> {
    return {
      ...dto,
      updatedAt: new Date()
    };
  }
}