import React, { createContext, useState, useEffect } from "react";
import { User } from "../../core/domain/entities/User";
import { LoginDTO, RegisterDTO } from "../../core/domain/dto/AuthDTO";
import { AuthService } from "../../infrastructure/services/AuthService";
import { getToken } from "../../infrastructure/services/TokenService";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginDTO) => Promise<void>;
  register: (userData: RegisterDTO) => Promise<User>;
  logout: () => void;
  loadUser: () => Promise<User | null>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async (): Promise<User | null> => {
    try {
      setLoading(true);
      const userData = await AuthService.getProfile();

      if (userData) {
        setUser(userData);
        return userData;
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
    return null;
  };

  const login = async (credentials: LoginDTO): Promise<void> => {
    try {
      setLoading(true);
      await AuthService.login(credentials);
      await loadUser();
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterDTO): Promise<User> => {
    try {
      setLoading(true);
      const response = await AuthService.register(userData);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    AuthService.logout();
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
