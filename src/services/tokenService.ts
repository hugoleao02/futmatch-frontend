/**
 * Serviço para gerenciar o token de autenticação
 * Centraliza todas as operações relacionadas ao token
 */

// Função para salvar o token em múltiplos locais
export const saveToken = (token: string): boolean => {
  try {
    // Salvar em localStorage
    localStorage.setItem("auth_token", token);

    // Backup em sessionStorage
    sessionStorage.setItem("auth_token_backup", token);

    // Backup em cookie (válido por 1 dia)
    document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=Strict`;

    // Salvar em uma variável global para debug
    (window as any).__AUTH_TOKEN = token;

    return true;
  } catch (error) {
    return false;
  }
};

// Função para obter o token de qualquer local disponível
export const getToken = (): string | null => {
  try {
    // Verificar variável global para debug
    const globalToken = (window as any).__AUTH_TOKEN;
    if (globalToken) {
      return globalToken;
    }

    // Tentar obter do localStorage primeiro
    let token = localStorage.getItem("auth_token");

    // Se não encontrar no localStorage, tentar no sessionStorage
    if (!token) {
      token = sessionStorage.getItem("auth_token_backup");
    }

    // Se ainda não encontrar, tentar nos cookies
    if (!token) {
      token = getCookie("auth_token");
    }

    return token;
  } catch (error) {
    return null;
  }
};

// Função para remover o token de todos os locais
export const removeToken = (): boolean => {
  try {
    // Remover do localStorage
    localStorage.removeItem("auth_token");

    // Remover do sessionStorage
    sessionStorage.removeItem("auth_token_backup");

    // Remover do cookie (definindo expiração no passado)
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict";

    // Remover da variável global
    delete (window as any).__AUTH_TOKEN;

    return true;
  } catch (error) {
    return false;
  }
};

// Função auxiliar para obter valor de um cookie
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

// Função para verificar se o token está presente
export const hasToken = (): boolean => {
  return getToken() !== null;
};

// Função para obter apenas o payload do token JWT
export const getTokenPayload = (): any => {
  const token = getToken();
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};
