import React, { createContext, useEffect, useState } from "react";

import { Jogador, LoginDTO, RegisterDTO } from "../@types";
import { Toast } from "../components/Toast/Toast";
import { useToast } from "../hooks/useToast";
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
  const { toast, showToast, hideToast } = useToast();

  const loadUser = async () => {
    try {
      const token = getToken();

      if (token) {
        const currentUser = await AuthService.fetchUserProfile();
        if (!currentUser) {
          showToast("Não foi possível carregar os dados do usuário", "error");
          return;
        }
        setUser(currentUser);
      }
    } catch (error) {
      setUser(null);
      showToast("Erro ao carregar usuário", "error");
    } finally {
      setLoading(false);
    }
  };

  const refreshUserProfile = async () => {
    try {
      const updatedUser = await AuthService.fetchUserProfile();
      if (!updatedUser) {
        showToast("Não foi possível atualizar o perfil", "error");
        return;
      }
      setUser(updatedUser);
    } catch (error) {
      showToast("Erro ao atualizar perfil", "error");
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (loginDTO: LoginDTO) => {
    try {
      setLoading(true);
      const loggedUser = await AuthService.login(loginDTO);
      if (!loggedUser) {
        showToast("Erro ao realizar login", "error");
        return;
      }
      setUser(loggedUser);
      showToast("Login realizado com sucesso", "success");
    } catch (error) {
      showToast("Erro ao realizar login", "error");
    } finally {
      setLoading(false);
    }
  };

  const register = async (registerDTO: RegisterDTO) => {
    try {
      setLoading(true);
      const newUser = await AuthService.register(registerDTO);
      if (!newUser) {
        showToast("Erro ao realizar cadastro", "error");
        return;
      }
      setUser(newUser);
      showToast("Cadastro realizado com sucesso", "success");
    } catch (error) {
      showToast("Erro ao realizar cadastro", "error");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    showToast("Logout realizado com sucesso", "info");
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
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={hideToast}
      />
    </AuthContext.Provider>
  );
};
