import React, { createContext, useContext, useState, useEffect } from "react";
import { Jogador, LoginDTO, CriarJogadorDTO } from "../types/api";
import { authService } from "../services/authService";

interface AuthContextType {
  user: Jogador | null;
  loading: boolean;
  login: (credentials: LoginDTO) => Promise<void>;
  register: (userData: CriarJogadorDTO) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Jogador | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const userData = await authService.getProfile();
      setUser(userData);
    } catch (error) {
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginDTO) => {
    const token = await authService.login(credentials);
    localStorage.setItem("token", token);
    await loadUser();
  };

  const register = async (userData: CriarJogadorDTO) => {
    const user = await authService.register(userData);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
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
