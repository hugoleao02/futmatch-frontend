import React, { createContext, useState, useEffect } from "react";
import { Jogador, LoginDTO, RegisterDTO } from "../@types";
import { AuthService } from "../infrastructure/services/AuthService";
import {
  getToken,
  getUserFromToken,
} from "../infrastructure/services/TokenService";

interface AuthContextData {
  user: Jogador | null;
  loading: boolean;
  login: (loginDTO: LoginDTO) => Promise<void>;
  register: (registerDTO: RegisterDTO) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Jogador | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = () => {
    try {
      const token = getToken();
      console.log("Token atual:", token);

      if (token) {
        const currentUser = getUserFromToken();
        console.log("Usuário decodificado do token:", currentUser);

        if (currentUser) {
          setUser(currentUser);
        } else {
          console.warn("Token presente mas usuário não pôde ser decodificado");
        }
      } else {
        console.log("Nenhum token encontrado");
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (loginDTO: LoginDTO) => {
    try {
      setLoading(true);
      const loggedUser = await AuthService.login(loginDTO);
      console.log("Usuário logado:", loggedUser);
      setUser(loggedUser);
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (registerDTO: RegisterDTO) => {
    try {
      setLoading(true);
      const newUser = await AuthService.register(registerDTO);
      console.log("Usuário registrado:", newUser);
      setUser(newUser);
    } catch (error) {
      console.error("Erro no registro:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  console.log("Estado atual do usuário:", user);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
