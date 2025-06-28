# Integração com API FutMatch

## Visão Geral

Este documento descreve as implementações realizadas para integrar o frontend com a API FutMatch baseada na documentação OpenAPI fornecida.

## Mudanças Implementadas

### 1. Atualização de Tipos

#### PartidaResponse

- Alterado `id` de `string` para `number`
- Removido objeto `criador` aninhado, substituído por `criadorId` e `criadorNome`
- Removido array `participantes`, substituído por `participantesConfirmados`
- Adicionado tipagem para corresponder ao schema da API

#### PartidaUpdateRequest

- Alterado para interface com campos opcionais
- Removido campo `id` (não necessário no request)
- Todos os campos são opcionais para atualizações parciais

#### LoginResponse e RegisterResponse

- Simplificado para corresponder ao schema `AuthResponse` da API
- Inclui `token`, `id`, `email` e `nome`
- Removido objeto `user` aninhado

#### Participacao

- Atualizado para corresponder ao schema `ParticipacaoResponse`
- Adicionado `usuarioNome`, `partidaId`, `partidaNome`
- Alterado tipos de ID para `number`

### 2. Novos Tipos Criados

#### PagePartidaResponse

- Interface para resposta paginada de partidas
- Inclui `SortObject` e `PageableObject`
- Usado para o endpoint `/api/partidas/futuras`

### 3. Atualização de Repositórios

#### IPartidaRepository

- Adicionado `listarPartidasFuturas(page?, size?)`
- Adicionado `buscarPartidaPorId(id)`
- Adicionado `deletarPartida(id)`
- Adicionado `participarPartida(id)`
- Adicionado `cancelarParticipacao(id)`
- Adicionado `aprovarParticipacao(partidaId, participanteId)`
- Adicionado `rejeitarParticipacao(partidaId, participanteId)`
- Alterado tipos de ID de `string` para `number`

#### PartidaRepositoryImpl

- Implementação de todos os novos métodos
- Uso correto dos endpoints da API
- Tratamento de parâmetros de paginação

#### Novo: IParticipacaoRepository

- Interface dedicada para gerenciar participações
- Métodos específicos para aprovação/rejeição

#### Novo: ParticipacaoRepositoryImpl

- Implementação do repositório de participações
- Separação de responsabilidades

### 4. Atualização de Use Cases

#### HomeUseCase

- Atualizado para usar `listarPartidasFuturas`
- Removido mapeamento desnecessário de dados
- Uso direto da resposta da API

#### Novo: ParticipacaoUseCase

- Use case dedicado para gerenciar participações
- Interface `IParticipacaoUseCase`

### 5. Atualização do Container de DI

#### Container

- Adicionado `participacaoRepository`
- Adicionado `participacaoUseCase`
- Atualização de tipos no `ContainerType`

### 6. Novos Hooks

#### useParticipacao

- Hook personalizado para gerenciar participações
- Inclui loading states e tratamento de erros
- Integração com toast notifications

## Endpoints da API Implementados

### Partidas

- `GET /api/partidas` - Listar todas as partidas
- `GET /api/partidas/futuras` - Listar partidas futuras com paginação
- `GET /api/partidas/{id}` - Buscar partida por ID
- `POST /api/partidas` - Criar nova partida
- `PUT /api/partidas/{id}` - Atualizar partida
- `DELETE /api/partidas/{id}` - Deletar partida

### Participações

- `POST /api/partidas/{id}/participar` - Participar de partida
- `DELETE /api/partidas/{id}/cancelar-participacao` - Cancelar participação
- `POST /api/participacoes/partida/{partidaId}` - Participar via endpoint alternativo
- `DELETE /api/participacoes/partida/{partidaId}` - Cancelar via endpoint alternativo
- `PUT /api/participacoes/partida/{partidaId}/participante/{participanteId}/aprovar` - Aprovar participação
- `PUT /api/participacoes/partida/{partidaId}/participante/{participanteId}/rejeitar` - Rejeitar participação

### Autenticação

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro

## Configuração da API

A configuração da API está centralizada em `src/infra/http/api.ts`:

- Base URL: `http://localhost:8080/api` (desenvolvimento)
- Interceptors para autenticação automática
- Tratamento de erros 401/403 com logout automático

## Próximos Passos

1. Testar a integração com a API real
2. Implementar tratamento de erros mais robusto
3. Adicionar validações de dados
4. Implementar cache de dados
5. Adicionar testes unitários para os novos componentes
