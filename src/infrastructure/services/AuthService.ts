import { API_URL } from '@shared/constants/app';

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  token: string;
}

export class AuthService {
  private readonly baseUrl = `${API_URL}/auth`;

  async login(credentials: { email: string; password: string }): Promise<LoginResponse> {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Falha ao fazer login');
    }

    return response.json();
  }

  async register(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<RegisterResponse> {
    const response = await fetch(`${this.baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Falha ao criar conta');
    }

    return response.json();
  }
}
