export interface UserDTO {
  id: string;
  nome: string;
  email: string;
  avatar?: string;
  isEmailVerified?: boolean;
  lastLoginAt?: string;
}

export interface CreateUserDTO {
  nome: string;
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  nome?: string;
  email?: string;
  avatar?: string;
}