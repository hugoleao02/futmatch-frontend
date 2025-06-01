# Documentação de Testes

## Visão Geral

O FutMatch utiliza uma abordagem de testes em múltiplas camadas, incluindo testes unitários, de integração e end-to-end. Utilizamos Jest como framework de testes e React Testing Library para testes de componentes.

## Estrutura de Diretórios

```
src/
├── __tests__/           # Testes unitários e de integração
│   ├── unit/           # Testes unitários
│   └── integration/    # Testes de integração
├── e2e/                # Testes end-to-end
└── test-utils/         # Utilitários de teste
```

## Testes Unitários

### Use Cases

```typescript
// __tests__/unit/usecases/LoginUseCase.test.ts
import { LoginUseCase } from '@/core/usecases/LoginUseCase';
import { AuthRepositoryMock } from '@/test-utils/mocks/AuthRepositoryMock';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let authRepository: AuthRepositoryMock;

  beforeEach(() => {
    authRepository = new AuthRepositoryMock();
    loginUseCase = new LoginUseCase(authRepository);
  });

  it('should validate required fields', async () => {
    await expect(loginUseCase.execute('', '')).rejects.toThrow('Todos os campos são obrigatórios');
  });

  it('should validate email format', async () => {
    await expect(loginUseCase.execute('invalid-email', 'password')).rejects.toThrow('E-mail inválido');
  });

  it('should return user and token on successful login', async () => {
    const result = await loginUseCase.execute('test@example.com', 'password123');
    expect(result).toHaveProperty('user');
    expect(result).toHaveProperty('token');
  });
});
```

### Repositories

```typescript
// __tests__/unit/repositories/AuthRepository.test.ts
import { AuthRepositoryImpl } from '@/data/repositories/AuthRepositoryImpl';
import { api } from '@/infra/http/api';

jest.mock('@/infra/http/api');

describe('AuthRepositoryImpl', () => {
  let authRepository: AuthRepositoryImpl;

  beforeEach(() => {
    authRepository = new AuthRepositoryImpl(api);
  });

  it('should make login request', async () => {
    const mockResponse = {
      user: { id: '1', nome: 'Test' },
      token: 'token123'
    };

    (api.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await authRepository.login('test@example.com', 'password123');
    expect(result).toEqual(mockResponse);
  });
});
```

## Testes de Integração

### Componentes

```typescript
// __tests__/integration/components/LoginForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '@/presentation/components/LoginForm';
import { AuthProvider } from '@/infra/di/AuthProvider';

describe('LoginForm', () => {
  const renderWithProvider = (component: React.ReactNode) => {
    return render(
      <AuthProvider>
        {component}
      </AuthProvider>
    );
  };

  it('should submit form with valid data', async () => {
    renderWithProvider(<LoginForm />);

    fireEvent.change(screen.getByLabelText('E-mail'), {
      target: { value: 'test@example.com' }
    });

    fireEvent.change(screen.getByLabelText('Senha'), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => {
      expect(screen.getByText('Login realizado com sucesso')).toBeInTheDocument();
    });
  });
});
```

### Páginas

```typescript
// __tests__/integration/pages/LoginPage.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginPage } from '@/presentation/pages/LoginPage';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/infra/di/AuthProvider';

describe('LoginPage', () => {
  const renderPage = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('should render login form', () => {
    renderPage();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should navigate to register page', () => {
    renderPage();
    fireEvent.click(screen.getByText('Criar conta'));
    expect(window.location.pathname).toBe('/register');
  });
});
```

## Testes E2E

### Cypress

```typescript
// e2e/login.cy.ts
describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login successfully', () => {
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="login-button"]').click();

    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="welcome-message"]').should('contain', 'Bem-vindo');
  });

  it('should show error with invalid credentials', () => {
    cy.get('[data-testid="email-input"]').type('invalid@example.com');
    cy.get('[data-testid="password-input"]').type('wrongpassword');
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="error-message"]').should('be.visible');
  });
});
```

## Mocks e Utilitários

### Repository Mock

```typescript
// test-utils/mocks/AuthRepositoryMock.ts
import { IAuthRepository } from '@/core/repositories/IAuthRepository';
import { LoginResponse, RegisterResponse } from '@/core/types/api';

export class AuthRepositoryMock implements IAuthRepository {
  async login(email: string, password: string): Promise<LoginResponse> {
    return {
      user: {
        id: '1',
        nome: 'Test User',
        email,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      token: 'mock-token'
    };
  }

  async register(nome: string, email: string, senha: string): Promise<RegisterResponse> {
    return {
      user: {
        id: '1',
        nome,
        email,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    };
  }

  logout(): void {
    // Mock implementation
  }
}
```

### Test Utils

```typescript
// test-utils/renderWithProviders.tsx
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/infra/di/AuthProvider';

export const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};
```

## Configuração

### Jest

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/src/test-utils/setup.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx'
  ]
};
```

### Cypress

```javascript
// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'e2e/**/*.cy.ts'
  }
});
```

## Cobertura de Testes

### Configuração

```javascript
// package.json
{
  "scripts": {
    "test": "jest",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch",
    "test:e2e": "cypress run",
    "test:e2e:dev": "cypress open"
  }
}
```

### Relatório de Cobertura

```bash
npm run test:coverage
```

O relatório será gerado em `coverage/lcov-report/index.html`.

## Boas Práticas

1. **Organização**
   - Mantenha testes próximos ao código testado
   - Use nomes descritivos para testes
   - Agrupe testes relacionados

2. **Isolamento**
   - Mock dependências externas
   - Limpe estado entre testes
   - Evite dependências entre testes

3. **Assertions**
   - Teste comportamento, não implementação
   - Use assertions específicas
   - Verifique edge cases

4. **Performance**
   - Mantenha testes rápidos
   - Evite testes redundantes
   - Use mocks apropriadamente

5. **Manutenção**
   - Atualize testes com mudanças no código
   - Remova testes obsoletos
   - Documente casos especiais

## CI/CD

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Run E2E tests
      run: npm run test:e2e
```

## Troubleshooting

### Problemas Comuns

1. **Testes Falhando**
   - Verifique mocks
   - Confirme dependências
   - Verifique timers

2. **Cypress Timeouts**
   - Aumente timeout
   - Verifique seletores
   - Confirme estado da aplicação

3. **Cobertura Baixa**
   - Adicione testes para casos não cobertos
   - Verifique configuração
   - Exclua código não testável

## Recursos

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Cypress Documentation](https://docs.cypress.io)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) 