import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

/**
 * Hook para acessar o contexto de autenticação
 * @returns O contexto de autenticação
 * @throws Error se usado fora de um AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
};
