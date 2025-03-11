import React, { createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RegisterResponse } from "../@types";
import { LoginDTO } from "../@types/auth/LoginDTO";
import { RegisterDTO } from "../@types/auth/RegisterDTO";
import { Jogador } from "../@types/jogador/Jogador";
import { Toast } from "../components/Toast/Toast";
import { useToast } from "../hooks/useToast";
import { AuthService } from "../infrastructure/services/AuthService";
import { getToken } from "../infrastructure/services/TokenService";
interface AuthContextData {
  user: Jogador | null;
  loading: boolean;
  login: (loginDTO: LoginDTO) => Promise<void>;
  register: (registerDTO: RegisterDTO) => Promise<RegisterResponse>;
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
  const [loading, setLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const { t } = useTranslation();

  const loadUser = async () => {
    const token = getToken();
    if (token) {
      try {
        const userProfile = await AuthService.fetchUserProfile();
        setUser(userProfile);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      }
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
      const response = await AuthService.login(loginDTO);
      setUser(response);

      // Se chegou aqui, o login foi bem sucedido
      if (Object.keys(response).length === 0) {
        // Login ok mas perfil não foi carregado
        showToast("Login realizado com sucesso, carregando perfil...", "info");
        // Tenta carregar o perfil novamente
        refreshUserProfile();
      }
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast(t("auth.errors.invalidCredentials"), "error");
      }
      throw error; // Propaga o erro para o componente de login
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    registerDTO: RegisterDTO
  ): Promise<RegisterResponse> => {
    try {
      setLoading(true);
      const response = await AuthService.register(registerDTO);

      if (!response.success) {
        showToast(response.message || t("auth.register.error"), "error");
        return response;
      }

      if (response.data) {
        setUser(response.data);
      }

      return response;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || t("auth.register.error");
      showToast(errorMessage, "error");
      return {
        success: false,
        message: errorMessage,
      };
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
