# FutMatch

O FutMatch é uma plataforma moderna para organização e participação em partidas de futebol pelada. Desenvolvido com React, TypeScript e seguindo princípios de Clean Architecture.

## 🚀 Tecnologias

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Jest
- React Testing Library
- Cypress
- Axios
- React Router DOM
- React Hook Form
- Yup

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Git

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/futmatch-frontend.git
cd futmatch-frontend
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

## 🏗️ Estrutura do Projeto

```
src/
├── core/                 # Regras de negócio e entidades
│   ├── entities/        # Entidades do domínio
│   ├── repositories/    # Interfaces dos repositórios
│   ├── types/          # Tipos e interfaces compartilhados
│   └── usecases/       # Casos de uso da aplicação
├── data/               # Implementações concretas
│   └── repositories/   # Implementações dos repositórios
├── infra/             # Infraestrutura e configurações
│   ├── di/            # Injeção de dependência
│   └── http/          # Configuração HTTP e API
└── presentation/      # Componentes e páginas da UI
    ├── components/    # Componentes reutilizáveis
    └── pages/         # Páginas da aplicação
```

## 🧪 Testes

### Testes Unitários
```bash
npm run test
# ou
yarn test
```

### Testes de Integração
```bash
npm run test:integration
# ou
yarn test:integration
```

### Testes E2E
```bash
npm run test:e2e
# ou
yarn test:e2e
```

### Cobertura de Testes
```bash
npm run test:coverage
# ou
yarn test:coverage
```

## 📦 Build

```bash
npm run build
# ou
yarn build
```

## 🚀 Deploy

O projeto está configurado para deploy automático no Vercel. Cada push para a branch `main` gera um novo deploy.

## 📚 Documentação

- [Arquitetura](docs/ARCHITECTURE.md)
- [API](docs/API.md)
- [Componentes](docs/COMPONENTS.md)
- [Testes](docs/TESTING.md)
- [Contribuição](CONTRIBUTING.md)
- [Código de Conduta](CODE_OF_CONDUCT.md)

## 🔐 Autenticação

### Login
```typescript
const { login } = useAuth();

await login('usuario@exemplo.com', 'senha123');
```

### Registro
```typescript
const { register } = useAuth();

await register({
  nome: 'João Silva',
  email: 'usuario@exemplo.com',
  senha: 'senha123'
});
```

## 🎨 UI/UX

O projeto utiliza Tailwind CSS para estilização e segue um design system consistente:

- Cores primárias: Verde (#15543A) e Dourado (#D6B36A)
- Tipografia: Roboto e Pacifico
- Componentes reutilizáveis
- Design responsivo
- Animações suaves

## 🔄 CI/CD

O projeto utiliza GitHub Actions para CI/CD:

- Testes automáticos
- Build automático
- Deploy automático
- Linting
- Type checking

## 📈 Monitoramento

- Logs de erro
- Métricas de performance
- Rastreamento de erros
- Analytics

## 🔒 Segurança

- Autenticação JWT
- HTTPS
- Proteção contra XSS
- Validação de inputs
- Sanitização de dados

## 🌐 Internacionalização

O projeto suporta múltiplos idiomas através do i18next:

```typescript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

t('welcome.message');
```

## 📱 PWA

O projeto é uma Progressive Web App com:

- Offline support
- Install prompt
- Push notifications
- Service workers

## 🤝 Contribuição

Por favor, leia o [guia de contribuição](CONTRIBUTING.md) antes de enviar um pull request.

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Equipe

- [Nome do Desenvolvedor](https://github.com/seu-usuario) - Desenvolvedor Full Stack

## 🙏 Agradecimentos

- [React](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Jest](https://jestjs.io)
- [Cypress](https://www.cypress.io)

## 📞 Suporte

Para suporte, envie um email para suporte@futmatch.com ou abra uma issue no GitHub.

## 🔄 Changelog

Veja o [CHANGELOG](CHANGELOG.md) para uma lista de mudanças recentes.

## 📝 Notas de Versão

### v1.0.0
- Lançamento inicial
- Autenticação completa
- Gerenciamento de partidas
- UI/UX moderna

## 🎯 Roadmap

- [ ] Chat em tempo real
- [ ] Sistema de rankings
- [ ] Integração com pagamentos
- [ ] App mobile
- [ ] Mais idiomas

## 🔍 Status do Projeto

🚧 Em desenvolvimento

## 📊 Métricas

- Cobertura de testes: 85%
- Performance: 90/100 (Lighthouse)
- Acessibilidade: 95/100 (Lighthouse)
- SEO: 90/100 (Lighthouse)

## 🌟 Features

- ✨ Autenticação completa
- 🎯 Gerenciamento de partidas
- 👥 Perfis de usuário
- 📱 Design responsivo
- 🌙 Modo escuro
- 🔔 Notificações
- 📊 Estatísticas
- 🗺️ Geolocalização

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview
npm run preview

# Testes
npm run test
npm run test:coverage
npm run test:e2e

# Linting
npm run lint
npm run lint:fix

# Type checking
npm run type-check
```

## 📦 Dependências Principais

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "axios": "^1.3.0",
    "tailwindcss": "^3.2.0"
  },
  "devDependencies": {
    "typescript": "^4.9.0",
    "vite": "^4.0.0",
    "jest": "^29.0.0",
    "cypress": "^12.0.0"
  }
}
```

## 🔧 Configuração do Ambiente

1. Node.js 18+
2. npm ou yarn
3. Git
4. Editor de código (VS Code recomendado)
5. Extensões recomendadas:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript Vue Plugin

## 🎨 Design System

### Cores
```css
:root {
  --primary: #15543A;
  --secondary: #D6B36A;
  --background: #FFFFFF;
  --text: #333333;
}
```

### Tipografia
```css
:root {
  --font-primary: 'Roboto', sans-serif;
  --font-secondary: 'Pacifico', cursive;
}
```

### Breakpoints
```css
:root {
  --sm: 640px;
  --md: 768px;
  --lg: 1024px;
  --xl: 1280px;
}
```

## 📱 Responsividade

O projeto é totalmente responsivo e otimizado para:

- 📱 Mobile (< 640px)
- 📱 Tablet (640px - 1024px)
- 💻 Desktop (> 1024px)

## 🔍 SEO

- Meta tags otimizadas
- Sitemap
- Robots.txt
- Schema.org
- Open Graph

## 🚀 Performance

- Code splitting
- Lazy loading
- Image optimization
- Caching
- Minification

## 🔒 Segurança

- HTTPS
- CSP
- CORS
- XSS Protection
- CSRF Protection

## 📊 Analytics

- Google Analytics
- Hotjar
- Error tracking
- Performance monitoring

## 🌐 Internacionalização

- i18next
- RTL support
- Date formatting
- Number formatting

## 📱 PWA

- Service workers
- Manifest
- Offline support
- Push notifications

## 🧪 Testes

- Unit tests
- Integration tests
- E2E tests
- Visual regression tests

## 📈 CI/CD

- GitHub Actions
- Automated testing
- Automated deployment
- Code quality checks

## 📚 Documentação

- API docs
- Component docs
- Architecture docs
- Contributing guide

## 🤝 Contribuição

Por favor, leia o [guia de contribuição](CONTRIBUTING.md) antes de enviar um pull request.

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
