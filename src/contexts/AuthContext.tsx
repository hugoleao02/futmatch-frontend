import React, { createContext, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RegisterResponse } from "../@types";
import { LoginDTO } from "../@types/auth/LoginDTO";
import { RegisterDTO } from "../@types/auth/RegisterDTO";
import { Jogador } from "../@types/jogador/Jogador";
import { Toast } from "../components/Toast/Toast";
import { useToast } from "../hooks/useToast";
import { AuthService } from "../infrastructure/services/AuthService";
import {
  getToken,
  getUserFromToken,
} from "../infrastructure/services/TokenService";

interface AuthContextData {
  user: Jogador | null;
  loading: boolean;
  login: (loginDTO: LoginDTO) => Promise<Jogador>;
  register: (registerDTO: RegisterDTO) => Promise<RegisterResponse>;
  logout: () => void;
  loadUserProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Jogador | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast, showToast, hideToast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const loadUserProfile = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) {
        setUser(null);
        return;
      }

      const tokenData = getUserFromToken();
      if (tokenData) {
        setUser(tokenData);
      }

      try {
        const userProfile = await AuthService.fetchUserProfile();
        if (userProfile) {
          setUser(userProfile);
        }
      } catch (profileError) {}
    } catch (error) {
      const tokenData = getUserFromToken();
      if (tokenData) {
        setUser(tokenData);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

  const login = async (loginDTO: LoginDTO): Promise<Jogador> => {
    try {
      const user = await AuthService.login(loginDTO);
      if (!user) {
        throw new Error("Falha no login");
      }
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const register = async (
    registerDTO: RegisterDTO
  ): Promise<RegisterResponse> => {
    try {
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
    }
  };

  const logout = useCallback(() => {
    AuthService.logout();
    setUser(null);
    navigate("/login");
  }, [navigate]);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    loadUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
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
