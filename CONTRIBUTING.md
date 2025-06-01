# Guia de Contribuição

## Introdução

Obrigado por considerar contribuir com o FutMatch! Este documento fornece diretrizes e instruções para contribuir com o projeto.

## Código de Conduta

Este projeto e todos os participantes estão comprometidos com o nosso Código de Conduta. Ao participar, você concorda em manter este código.

## Como Contribuir

### 1. Configuração do Ambiente

1. Faça um fork do repositório
2. Clone seu fork:
   ```bash
   git clone https://github.com/seu-usuario/futmatch-frontend.git
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```

### 2. Fluxo de Trabalho

1. Crie uma branch para sua feature:
   ```bash
   git checkout -b feature/nome-da-feature
   ```

2. Faça suas alterações

3. Execute os testes:
   ```bash
   npm test
   ```

4. Verifique o linting:
   ```bash
   npm run lint
   ```

5. Faça commit das suas alterações:
   ```bash
   git commit -m "feat: adiciona nova feature"
   ```

6. Envie para seu fork:
   ```bash
   git push origin feature/nome-da-feature
   ```

7. Abra um Pull Request

### 3. Convenções de Commit

Seguimos o [Conventional Commits](https://www.conventionalcommits.org/):

- `feat`: Nova feature
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Tarefas gerais

Exemplo:
```bash
git commit -m "feat: adiciona autenticação com Google"
```

### 4. Padrões de Código

#### TypeScript

- Use tipos explícitos
- Evite `any`
- Use interfaces para objetos
- Documente funções complexas

```typescript
interface User {
  id: string;
  nome: string;
  email: string;
}

function createUser(user: User): Promise<User> {
  // Implementação
}
```

#### React

- Use componentes funcionais
- Use hooks
- Mantenha componentes pequenos
- Use props tipadas

```typescript
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function Button({ onClick, children }: ButtonProps) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

#### Estilização

- Use Material-UI
- Mantenha consistência
- Use variáveis para cores
- Siga o tema

```typescript
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));
```

### 5. Testes

#### Unitários

- Teste cada componente
- Use mocks quando necessário
- Mantenha testes independentes

```typescript
describe('Button', () => {
  it('should render correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

#### Integração

- Teste fluxos completos
- Verifique interações
- Teste erros

```typescript
describe('Login', () => {
  it('should handle login flow', async () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    });
  });
});
```

### 6. Documentação

#### Código

- Documente funções complexas
- Explique lógica não óbvia
- Mantenha comentários atualizados

```typescript
/**
 * Calcula o preço total com desconto
 * @param price - Preço base
 * @param discount - Percentual de desconto
 * @returns Preço com desconto aplicado
 */
function calculateDiscount(price: number, discount: number): number {
  return price * (1 - discount / 100);
}
```

#### README

- Mantenha atualizado
- Inclua exemplos
- Documente configurações

### 7. Pull Request

1. Descreva as mudanças
2. Referencie issues
3. Inclua screenshots se necessário
4. Verifique checklist

```markdown
## Descrição
Adiciona autenticação com Google

## Mudanças
- Implementa login com Google
- Adiciona botão de login
- Atualiza documentação

## Screenshots
[Adicione screenshots aqui]

## Checklist
- [ ] Testes adicionados
- [ ] Documentação atualizada
- [ ] Linting passou
- [ ] Build passou
```

### 8. Revisão de Código

- Revise PRs de outros
- Seja construtivo
- Verifique padrões
- Teste localmente

### 9. Manutenção

- Mantenha dependências atualizadas
- Remova código não usado
- Mantenha testes atualizados
- Documente mudanças

## Recursos

- [Documentação](docs/)
- [Issues](https://github.com/seu-usuario/futmatch-frontend/issues)
- [Discord](https://discord.gg/futmatch)

## Suporte

- Abra uma issue
- Use o Discord
- Consulte a documentação

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 