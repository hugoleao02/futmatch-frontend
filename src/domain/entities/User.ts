import type { BaseEntity } from '../../shared/types';
import type { UserPreferences } from './UserPreferences';

// Roles do usuário
export type UserRole = 'admin' | 'moderator' | 'user' | 'guest';

// Entidade principal de usuário
export interface User extends BaseEntity {
  nome: string;
  email: string;
  avatar?: string;
  isEmailVerified?: boolean;
  lastLoginAt?: Date;
}

// Usuário com informações de autenticação
export interface AuthenticatedUser extends User {
  role: UserRole;
  permissions: string[];
  preferences: UserPreferences;
}
