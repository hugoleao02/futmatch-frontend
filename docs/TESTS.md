# Documentação dos Testes

## Visão Geral

O FutMatch Frontend utiliza uma abordagem de testes em camadas, cobrindo desde testes unitários até testes de integração. A estrutura de testes segue a mesma organização do código fonte.

## Estrutura de Testes

```
src/
├── __tests__/
│   ├── core/
│   │   ├── usecases/
│   │   └── entities/
│   ├── data/
│   │   └── repositories/
│   └── presentation/
│       ├── pages/
│       └── components/
```

## Testes Unitários

### Casos de Uso

```typescript
// __tests__/core/usecases/LoginUseCase.test.ts
import { LoginUseCase } from '../../../core/usecases/LoginUseCase';
import { IAuthRepository } from '../../../core/repositories/IAuthRepository';
import { AUTH_ERRORS } from '../../../core/constants/errors';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let mockAuthRepository: jest.Mocked<IAuthRepository>;

  beforeEach(() => {
    mockAuthRepository = {
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
    };
    loginUseCase = new LoginUseCase(mockAuthRepository);
  });

  it('should validate required fields', async () => {
    await expect(loginUseCase.execute('', '')).rejects.toThrow(AUTH_ERRORS.REQUIRED_FIELDS);
  });

  it('should validate email format', async () => {
    await expect(loginUseCase.execute('invalid-email', 'password')).rejects.toThrow(AUTH_ERRORS.INVALID_EMAIL);
  });

  it('should call repository with valid credentials', async () => {
    const mockResponse = {
      user: {
        id: '1',
        nome: 'Test User',
        email: 'test@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      token: 'mock-token',
    };

    mockAuthRepository.login.mockResolvedValue(mockResponse);

    const result = await loginUseCase.execute('test@example.com', 'password');
    expect(result).toEqual(mockResponse);
    expect(mockAuthRepository.login).toHaveBeenCalledWith('test@example.com', 'password');
  });
});
```

### Repositórios

```typescript
// __tests__/data/repositories/AuthRepositoryImpl.test.ts
import { AuthRepositoryImpl } from '../../../data/repositories/AuthRepositoryImpl';
import { api } from '../../../infra/http/api';
import { AUTH_ERRORS } from '../../../core/constants/errors';

jest.mock('../../../infra/http/api');

describe('AuthRepositoryImpl', () => {
  let authRepository: AuthRepositoryImpl;

  beforeEach(() => {
    authRepository = new AuthRepositoryImpl(api);
  });

  it('should handle successful login', async () => {
    const mockResponse = {
      data: {
        user: {
          id: '1',
          nome: 'Test User',
          email: 'test@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        token: 'mock-token',
      },
    };

    (api.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await authRepository.login('test@example.com', 'password');
    expect(result).toEqual(mockResponse.data);
    expect(api.post).toHaveBeenCalledWith('/auth/login', {
      email: 'test@example.com',
      senha: 'password',
    });
  });

  it('should handle login error', async () => {
    (api.post as jest.Mock).mockRejectedValue(new Error(AUTH_ERRORS.INVALID_CREDENTIALS));

    await expect(authRepository.login('test@example.com', 'wrong-password'))
      .rejects.toThrow(AUTH_ERRORS.INVALID_CREDENTIALS);
  });
});
```

## Testes de Integração

### Páginas

```typescript
// __tests__/presentation/pages/LoginPage.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginPage } from '../../../presentation/pages/LoginPage';
import { UseCaseProvider } from '../../../infra/di/UseCaseProvider';
import { container } from '../../../infra/di/container';

describe('LoginPage', () => {
  const renderLoginPage = () => {
    return render(
      <UseCaseProvider>
        <LoginPage />
      </UseCaseProvider>
    );
  };

  it('should render login form', () => {
    renderLoginPage();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    renderLoginPage();

    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(container.useCases.loginUseCase.execute).toHaveBeenCalledWith(
        'test@example.com',
        'password'
      );
    });
  });

  it('should show error message for invalid credentials', async () => {
    renderLoginPage();

    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: 'wrong-password' },
    });

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/e-mail ou senha inválidos/i)).toBeInTheDocument();
    });
  });
});
```

### Componentes

```typescript
// __tests__/presentation/components/Input.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../../../presentation/components/Input';

describe('Input', () => {
  it('should render with label', () => {
    render(<Input label="Test Label" />);
    expect(screen.getByLabelText(/test label/i)).toBeInTheDocument();
  });

  it('should handle value change', () => {
    const handleChange = jest.fn();
    render(<Input label="Test" onChange={handleChange} />);

    fireEvent.change(screen.getByLabelText(/test/i), {
      target: { value: 'new value' },
    });

    expect(handleChange).toHaveBeenCalled();
  });

  it('should show error message', () => {
    render(
      <Input
        label="Test"
        error={true}
        helperText="Error message"
      />
    );

    expect(screen.getByText(/error message/i)).toBeInTheDocument();
  });
});
```

## Testes E2E

```typescript
// cypress/e2e/auth.cy.ts
describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login successfully', () => {
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('password');
    cy.get('[data-testid="login-button"]').click();

    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="user-name"]').should('contain', 'Test User');
  });

  it('should show error for invalid credentials', () => {
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('wrong-password');
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="error-message"]').should('be.visible');
    cy.url().should('include', '/login');
  });
});
```

## Configuração

### Jest
```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
  ],
};
```

### Cypress
```javascript
// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});
```

## Cobertura de Testes

### Relatório de Cobertura
```bash
npm run test:coverage
```

### Configuração de Cobertura
```javascript
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

## Boas Práticas

1. **Organização**
   - Testes próximos ao código testado
   - Nomes descritivos
   - Estrutura clara

2. **Isolamento**
   - Mocks para dependências
   - Setup e teardown adequados
   - Estado limpo entre testes

3. **Assertions**
   - Assertions específicas
   - Mensagens claras
   - Cobertura adequada

4. **Manutenção**
   - Testes independentes
   - Código limpo
   - Documentação clara

## Próximos Passos

1. **Cobertura**
   - Aumentar cobertura de testes
   - Adicionar testes de borda
   - Implementar testes de performance

2. **Automação**
   - Configurar CI/CD
   - Adicionar relatórios
   - Automatizar execução

3. **Qualidade**
   - Adicionar linting
   - Implementar pre-commit hooks
   - Melhorar documentação 