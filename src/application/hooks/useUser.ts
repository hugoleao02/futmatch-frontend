import { useEffect, useState } from 'react';
import type { AuthenticatedUser } from '../../domain/entities/User';
import { useAuthStore } from '../../presentation/stores/authStore';

export function useUser() {
  const [loading, setLoading] = useState(true);
  const { user, setUser, clearUser } = useAuthStore();

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // TODO: Implementar chamada à API de login
      const user: AuthenticatedUser = {
        id: '1',
        nome: 'Test User',
        email: email,
        role: 'user',
        permissions: [],
        createdAt: new Date(),
        updatedAt: new Date(),
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
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    clearUser();
  };

  const register = async (nome: string, email: string, password: string) => {
    try {
      // TODO: Implementar chamada à API de registro
      const user: AuthenticatedUser = {
        id: '1',
        nome,
        email,
        role: 'user',
        permissions: [],
        createdAt: new Date(),
        updatedAt: new Date(),
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
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };
}
