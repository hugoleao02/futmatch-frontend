import React, { useState, useEffect } from "react";
import { Jogador, LoginDTO, CriarJogadorDTO } from "../types/api";
import { authService } from "../services/authService";
import { AuthContext } from "./AuthContextDef";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Jogador | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token no localStorage:", token);
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      console.log("Carregando usuário...");
      const userData = await authService.getProfile();
      console.log("Usuário carregado:", userData);
      setUser(userData);
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginDTO) => {
    try {
      console.log("Fazendo login com:", credentials);
      const token = await authService.login(credentials);
      console.log("Token recebido:", token);
      if (token) {
        localStorage.setItem("token", token);
        await loadUser();
      }
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  const register = async (userData: CriarJogadorDTO) => {
    try {
      console.log("Registrando usuário:", userData);
      const response = await authService.register(userData);
      console.log("Resposta do registro:", response);

      // Não faz login automático após o registro
      // O usuário será redirecionado para a página de login
      return response;
    } catch (error) {
      console.error("Erro no registro:", error);
      throw error;
    }
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
