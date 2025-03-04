import { createContext } from "react";
import { Jogador, LoginDTO, CriarJogadorDTO } from "../types/api";

interface AuthContextType {
  user: Jogador | null;
  loading: boolean;
  login: (credentials: LoginDTO) => Promise<void>;
  register: (userData: CriarJogadorDTO) => Promise<Jogador>;
  logout: () => void;
  loadUser: () => Promise<Jogador | null>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
