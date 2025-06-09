# Clean Architecture - FutMatch Frontend

## Estrutura do Projeto

```
src/
├── domain/           # Camada de domínio (mais interna)
│   ├── entities/     # Entidades de domínio
│   ├── usecases/     # Casos de uso (interfaces)
│   └── repositories/ # Interfaces dos repositórios
│
├── application/      # Camada de aplicação
│   ├── usecases/     # Implementações dos casos de uso
│   ├── mappers/      # Mapeadores entre camadas
│   └── dtos/         # Objetos de transferência de dados
│
├── infrastructure/   # Camada de infraestrutura
│   ├── repositories/ # Implementações dos repositórios
│   ├── services/     # Serviços externos
│   ├── http/         # Clientes HTTP
│   └── storage/      # Armazenamento local
│
└── presentation/     # Camada de apresentação
    ├── components/   # Componentes React
    ├── pages/        # Páginas/rotas
    ├── viewmodels/   # ViewModels
    └── hooks/        # Hooks personalizados
```

## Regras de Arquitetura

1. **Domain Layer**

   - Contém apenas lógica de negócio pura
   - Não depende de nenhuma outra camada
   - Define interfaces para repositórios
   - Define entidades e casos de uso

2. **Application Layer**

   - Implementa casos de uso definidos no domínio
   - Coordena o fluxo de dados entre camadas
   - Contém mappers para transformação de dados
   - Define DTOs para transferência de dados

3. **Infrastructure Layer**

   - Implementa interfaces definidas no domínio
   - Gerencia comunicação com serviços externos
   - Implementa persistência de dados
   - Fornece implementações concretas

4. **Presentation Layer**
   - Gerencia a interface do usuário
   - Usa ViewModels para gerenciar estado
   - Implementa componentes React
   - Define hooks para lógica reutilizável

## Princípios

1. **Dependência**

   - As dependências apontam sempre para dentro
   - Camadas externas dependem das internas
   - Camadas internas não conhecem as externas

2. **Inversão de Dependência**

   - Interfaces são definidas nas camadas internas
   - Implementações são fornecidas pelas camadas externas

3. **Separação de Responsabilidades**

   - Cada camada tem uma responsabilidade única
   - A comunicação entre camadas é feita através de interfaces

4. **Testabilidade**
   - Cada camada pode ser testada isoladamente
   - Dependências são injetadas via interfaces
   - Mocks podem ser facilmente implementados
