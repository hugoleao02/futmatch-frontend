export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  nome: string;
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    nome: string;
    email: string;
  };
}
