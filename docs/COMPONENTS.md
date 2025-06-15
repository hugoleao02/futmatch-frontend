# Documentação dos Componentes

## Visão Geral

O FutMatch utiliza uma biblioteca de componentes reutilizáveis construída com React e TypeScript. Os componentes seguem os princípios de design atômico e são estilizados com Tailwind CSS.

## Estrutura de Diretórios

```
src/presentation/components/
├── atoms/          # Componentes básicos
├── molecules/      # Componentes compostos
├── organisms/      # Componentes complexos
└── templates/      # Layouts e templates
```

## Componentes Atômicos

### Button

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

**Exemplo de Uso:**
```tsx
<Button 
  variant="primary"
  size="md"
  onClick={() => console.log('clicked')}
>
  Entrar
</Button>
```

### Input

```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password';
  label?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}
```

**Exemplo de Uso:**
```tsx
<Input
  type="email"
  label="E-mail"
  value={email}
  onChange={setEmail}
  error={errors.email}
  required
/>
```

### Typography

```typescript
interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  color?: 'primary' | 'secondary' | 'error';
  children: React.ReactNode;
}
```

**Exemplo de Uso:**
```tsx
<Typography variant="h1" color="primary">
  Bem-vindo ao FutMatch
</Typography>
```

## Componentes Moleculares

### FormField

```typescript
interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}
```

**Exemplo de Uso:**
```tsx
<FormField label="E-mail" error={errors.email}>
  <Input
    type="email"
    value={email}
    onChange={setEmail}
  />
</FormField>
```

### Card

```typescript
interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}
```

**Exemplo de Uso:**
```tsx
<Card title="Login">
  <Form>
    {/* Form fields */}
  </Form>
  <Card.Footer>
    <Button>Entrar</Button>
  </Card.Footer>
</Card>
```

### Alert

```typescript
interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}
```

**Exemplo de Uso:**
```tsx
<Alert
  type="success"
  message="Login realizado com sucesso!"
  onClose={() => setShowAlert(false)}
/>
```

## Componentes Organismos

### LoginForm

```typescript
interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
}
```

**Exemplo de Uso:**
```tsx
<LoginForm
  onSubmit={handleLogin}
  isLoading={isLoading}
/>
```

### RegisterForm

```typescript
interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  isLoading?: boolean;
}
```

**Exemplo de Uso:**
```tsx
<RegisterForm
  onSubmit={handleRegister}
  isLoading={isLoading}
/>
```

### PartidaCard

```typescript
interface MatchCardProps {
  match: Match;
  onJoin?: () => void;
  onLeave?: () => void;
}
```

**Exemplo de Uso:**
```tsx
<PartidaCard
  match={match}
  onJoin={handleJoin}
  onLeave={handleLeave}
/>
```

## Templates

### AuthLayout

```typescript
interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}
```

**Exemplo de Uso:**
```tsx
<AuthLayout
  title="Login"
  subtitle="Entre com suas credenciais"
>
  <LoginForm onSubmit={handleLogin} />
</AuthLayout>
```

### DashboardLayout

```typescript
interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}
```

**Exemplo de Uso:**
```tsx
<DashboardLayout
  sidebar={<Sidebar />}
>
  <DashboardContent />
</DashboardLayout>
```

## Hooks

### useForm

```typescript
interface UseFormProps<T> {
  initialValues: T;
  validationSchema?: Yup.Schema<T>;
  onSubmit: (values: T) => void;
}
```

**Exemplo de Uso:**
```tsx
const { values, errors, handleChange, handleSubmit } = useForm({
  initialValues: {
    email: '',
    password: ''
  },
  validationSchema: loginSchema,
  onSubmit: handleLogin
});
```

### useAuth

```typescript
interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
```

**Exemplo de Uso:**
```tsx
const { user, isAuthenticated, login, logout } = useAuth();
```

## Estilização

### Tailwind CSS

Os componentes utilizam classes do Tailwind CSS para estilização. Exemplo:

```tsx
<button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded">
  Botão
</button>
```

### Tema

O tema é configurado no arquivo `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#3B82F6',
          600: '#2563EB'
        },
        secondary: {
          500: '#6B7280',
          600: '#4B5563'
        }
      }
    }
  }
}
```

## Acessibilidade

### ARIA Labels

Todos os componentes incluem atributos ARIA apropriados:

```tsx
<button
  aria-label="Fechar"
  aria-expanded={isOpen}
>
  <Icon name="close" />
</button>
```

### Keyboard Navigation

Suporte a navegação por teclado:

```tsx
<div
  role="button"
  tabIndex={0}
  onKeyPress={handleKeyPress}
>
  Conteúdo
</div>
```

## Testes

### Unit Tests

```typescript
describe('Button', () => {
  it('should render correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

### Integration Tests

```typescript
describe('LoginForm', () => {
  it('should submit form data', async () => {
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByLabelText('E-mail'), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.change(screen.getByLabelText('Senha'), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(screen.getByText('Entrar'));
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });
});
```

## Performance

### Memoização

```typescript
const MemoizedComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});
```

### Lazy Loading

```typescript
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
}
```

## Boas Práticas

1. **Props Naming**
   - Use nomes descritivos
   - Evite abreviações
   - Mantenha consistência

2. **Type Safety**
   - Defina interfaces para props
   - Use tipos estritos
   - Evite `any`

3. **Component Composition**
   - Prefira composição sobre herança
   - Mantenha componentes pequenos
   - Reutilize lógica com hooks

4. **Error Handling**
   - Trate erros adequadamente
   - Forneça feedback ao usuário
   - Log erros apropriadamente

5. **Documentation**
   - Documente props
   - Inclua exemplos
   - Mantenha docs atualizados 