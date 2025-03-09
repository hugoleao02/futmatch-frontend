import React, { createContext, useEffect, useState } from "react";

import { Jogador, LoginDTO, RegisterDTO } from "../@types";
import { AuthService } from "../infrastructure/services/AuthService";
import { getToken } from "../infrastructure/services/TokenService";

interface AuthContextData {
  user: Jogador | null;
  loading: boolean;
  login: (loginDTO: LoginDTO) => Promise<void>;
  register: (registerDTO: RegisterDTO) => Promise<void>;
  logout: () => void;
  refreshUserProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Jogador | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const token = getToken();

      if (token) {
        const currentUser = await AuthService.fetchUserProfile();
        setUser(currentUser);
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshUserProfile = async () => {
    try {
      const updatedUser = await AuthService.fetchUserProfile();
      setUser(updatedUser);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (loginDTO: LoginDTO) => {
    try {
      setLoading(true);
      const loggedUser = await AuthService.login(loginDTO);
      setUser(loggedUser);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (registerDTO: RegisterDTO) => {
    try {
      setLoading(true);
      const newUser = await AuthService.register(registerDTO);
      setUser(newUser);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
