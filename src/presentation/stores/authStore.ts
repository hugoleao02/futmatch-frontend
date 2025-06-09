import type { AuthenticatedUser } from '@domain/entities/User';
import { create } from 'zustand';

interface AuthState {
  user: AuthenticatedUser | null;
  token: string | null;
  refreshToken: string | null;
  setUser: (user: AuthenticatedUser | null) => void;
  setToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  clearAuth: () => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  token: null,
  refreshToken: null,
  setUser: user => set({ user }),
  setToken: token => set({ token }),
  setRefreshToken: refreshToken => set({ refreshToken }),
  clearAuth: () => set({ user: null, token: null, refreshToken: null }),
  clearUser: () => set({ user: null }),
}));
