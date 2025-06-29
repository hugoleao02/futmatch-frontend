import type { BaseEntity } from '../../shared/types';
import type { UserPreferences } from './UserPreferences';

export type UserRole = 'admin' | 'moderator' | 'user' | 'guest';

/**
 * Entidade principal de usuário.
 */
export interface User extends BaseEntity {
  nome: string;
  email: string;
  avatar?: string;
  isEmailVerified?: boolean;
  lastLoginAt?: Date;
  deletedAt?: Date | null;
}

/**
 * Usuário autenticado com permissões e preferências.
 */
export interface AuthenticatedUser extends User {
  role: UserRole;
  permissions: string[];
  preferences: UserPreferences;
}
