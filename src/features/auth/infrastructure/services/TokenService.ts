const TOKEN_KEY = "@futmatch/token";

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isTokenValid = (token: string): boolean => {
  try {
    // Aqui você pode adicionar lógica para verificar se o token é válido
    // Por exemplo, verificar se não está expirado
    return true;
  } catch {
    return false;
  }
};
