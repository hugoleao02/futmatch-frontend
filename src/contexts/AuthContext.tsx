import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LoginDTO } from "../@types/auth/LoginDTO";
import { RegisterDTO } from "../@types/auth/RegisterDTO";
import { RegisterResponse } from "../@types/auth/RegisterResponse";
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
  isAuthenticated: boolean;
  initialLoadComplete: boolean;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Jogador | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const loadUser = async () => {
    try {
      const token = getToken();
      if (!token) {
        setUser(null);
        return;
      }

      const userProfile = await AuthService.fetchUserProfile();
      if (userProfile) {
        setUser(userProfile);
      } else {
        setUser(null);
        localStorage.removeItem("auth_token");
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      setUser(null);
      localStorage.removeItem("auth_token");
    } finally {
      setLoading(false);
      setInitialLoadComplete(true);
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
    const token = getToken();
    const currentPath = window.location.pathname;
    const publicRoutes = ["/login", "/register", "/recuperar-senha"];

    if (!token && !publicRoutes.includes(currentPath)) {
      navigate("/login");
    } else {
      loadUser();
    }
  }, [navigate]);

  useEffect(() => {
    if (initialLoadComplete && !user && !loading) {
      const currentPath = window.location.pathname;
      const publicRoutes = ["/login", "/register", "/recuperar-senha"];

      if (!publicRoutes.includes(currentPath)) {
        navigate("/login");
      }
    }
  }, [initialLoadComplete, user, loading, navigate]);

  const login = async (loginDTO: LoginDTO) => {
    try {
      setLoading(true);
      const response = await AuthService.login(loginDTO);
      setUser(response);

      if (response && Object.keys(response).length === 0) {
        showToast("Login realizado com sucesso, carregando perfil...", "info");
        refreshUserProfile();
      }
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast(t("auth.errors.invalidCredentials"), "error");
      }
      throw error;
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
    localStorage.removeItem("auth_token");
    showToast("Logout realizado com sucesso", "info");
    navigate("/login");
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
        isAuthenticated: !!user,
        initialLoadComplete,
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
