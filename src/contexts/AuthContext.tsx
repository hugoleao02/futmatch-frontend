import React, { useState, useEffect } from "react";
import { Jogador, LoginDTO, CriarJogadorDTO } from "../types/api";
import { authService } from "../services/authService";
import { AuthContext } from "./AuthContextDef";
import { getToken, saveToken, removeToken } from "../services/tokenService";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Jogador | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      console.log("AuthContext - Tentando carregar usuário");
      console.log("AuthContext - Token atual:", getToken());

      const userData = await authService.getProfile();
      console.log("AuthContext - Dados do usuário recebidos:", userData);

      if (userData) {
        setUser(userData);
        console.log("AuthContext - Usuário definido com sucesso");
        return userData;
      } else {
        console.log("AuthContext - Dados do usuário vazios");
        setUser(null);
      }
    } catch (error) {
      console.error("AuthContext - Erro ao carregar usuário:", error);
      // Não remover o token aqui, apenas limpar o estado do usuário
      setUser(null);
    } finally {
      setLoading(false);
    }
    return null;
  };

  const login = async (credentials: LoginDTO) => {
    try {
      const token = await authService.login(credentials);

      if (token) {
        // Salvar o token usando nossa função auxiliar
        saveToken(token);

        // Verificar se o token está disponível globalmente
        window.setTimeout(() => {
          // Verificação adicional após delay
          getToken();
        }, 500);

        await loadUser();
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: CriarJogadorDTO) => {
    try {
      const response = await authService.register(userData);
      // Não faz login automático após o registro
      // O usuário será redirecionado para a página de login
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    // Chamar o método de logout do serviço de autenticação
    authService.logout();

    // Remover o token usando nossa função auxiliar
    removeToken();

    // Limpar o estado do usuário
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, loadUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
