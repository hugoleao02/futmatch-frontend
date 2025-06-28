// Configurações de notificação
export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  inApp: boolean;
  matchReminders: boolean;
  newMessages: boolean;
}

// Configurações de privacidade
export interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  showEmail: boolean;
  showLocation: boolean;
  allowFriendRequests: boolean;
}

// Preferências do usuário
export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'pt' | 'en' | 'es';
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}
