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
      console.log("Token antes do login:", localStorage.getItem("token"));

      const token = await authService.login(credentials);
      console.log("Token recebido:", token);

      if (token) {
        // Garantir que o token seja salvo no localStorage
        localStorage.setItem("token", token);
        console.log(
          "Token salvo no localStorage:",
          localStorage.getItem("token")
        );

        // Verificar se o token foi realmente salvo
        const savedToken = localStorage.getItem("token");
        if (!savedToken) {
          console.error("Falha ao salvar token no localStorage!");
          // Tentar novamente
          localStorage.setItem("token", token);
          console.log(
            "Segunda tentativa de salvar token:",
            localStorage.getItem("token")
          );
        }

        await loadUser();
      } else {
        console.error("Token não recebido do servidor");
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
    console.log("Realizando logout...");
    console.log("Token antes do logout:", localStorage.getItem("token"));

    try {
      // Chamar o método de logout do serviço de autenticação
      authService.logout();

      // Garantir que o token seja removido do localStorage
      localStorage.removeItem("token");
      console.log("Token após logout:", localStorage.getItem("token"));

      // Verificar se o token foi realmente removido
      const token = localStorage.getItem("token");
      if (token) {
        console.error("Falha ao remover token do localStorage!");
        // Tentar novamente
        localStorage.removeItem("token");
        console.log(
          "Segunda tentativa de remover token:",
          localStorage.getItem("token")
        );
      }
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }

    // Limpar o estado do usuário
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
