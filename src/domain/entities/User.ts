// Entidade principal de usuário
export interface User {
  id: string;
  nome: string;
  email: string;
  avatar?: string;
  isEmailVerified?: boolean;
  lastLoginAt?: Date;
}

// Roles do usuário
export type UserRole = 'admin' | 'moderator' | 'user' | 'guest';

// Usuário com informações de autenticação
export interface AuthenticatedUser extends User {
  role?: UserRole;
  permissions?: string[];
  preferences?: UserPreferences;
}

// Preferências do usuário
export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'pt' | 'en' | 'es';
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

// Configurações de notificação
export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  inApp: boolean;
  matchReminders: boolean;
  roomInvitations: boolean;
  newMessages: boolean;
}

// Configurações de privacidade
export interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  showEmail: boolean;
  showLocation: boolean;
  allowFriendRequests: boolean;
  allowRoomInvitations: boolean;
}
