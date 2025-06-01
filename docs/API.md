# Documentação da API

## Visão Geral

A API do FutMatch é uma API RESTful que fornece endpoints para autenticação, gerenciamento de usuários e funcionalidades relacionadas a partidas de futebol.

## Base URL

```
https://api.futmatch.com/v1
```

## Autenticação

A API utiliza autenticação baseada em JWT (JSON Web Token). Para acessar endpoints protegidos, inclua o token no header da requisição:

```
Authorization: Bearer <seu_token>
```

### Endpoints de Autenticação

#### Login

```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "usuario@exemplo.com",
  "senha": "senha123"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "123",
    "nome": "João Silva",
    "email": "usuario@exemplo.com",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Registro

```http
POST /auth/register
```

**Request Body:**
```json
{
  "nome": "João Silva",
  "email": "usuario@exemplo.com",
  "senha": "senha123"
}
```

**Response (201 Created):**
```json
{
  "user": {
    "id": "123",
    "nome": "João Silva",
    "email": "usuario@exemplo.com",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

## Endpoints de Usuário

### Obter Perfil

```http
GET /users/me
```

**Response (200 OK):**
```json
{
  "id": "123",
  "nome": "João Silva",
  "email": "usuario@exemplo.com",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### Atualizar Perfil

```http
PUT /users/me
```

**Request Body:**
```json
{
  "nome": "João Silva Atualizado",
  "email": "novo@exemplo.com"
}
```

**Response (200 OK):**
```json
{
  "id": "123",
  "nome": "João Silva Atualizado",
  "email": "novo@exemplo.com",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

## Endpoints de Partidas

### Listar Partidas

```http
GET /matches
```

**Query Parameters:**
- `page` (opcional): Número da página (default: 1)
- `limit` (opcional): Itens por página (default: 10)
- `status` (opcional): Filtro por status (pending, active, finished)

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "123",
      "titulo": "Pelada do Bairro",
      "data": "2024-01-01T15:00:00Z",
      "local": "Campo do Bairro",
      "maxJogadores": 10,
      "status": "pending",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

### Criar Partida

```http
POST /matches
```

**Request Body:**
```json
{
  "titulo": "Pelada do Bairro",
  "data": "2024-01-01T15:00:00Z",
  "local": "Campo do Bairro",
  "maxJogadores": 10
}
```

**Response (201 Created):**
```json
{
  "id": "123",
  "titulo": "Pelada do Bairro",
  "data": "2024-01-01T15:00:00Z",
  "local": "Campo do Bairro",
  "maxJogadores": 10,
  "status": "pending",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### Participar de Partida

```http
POST /matches/:id/join
```

**Response (200 OK):**
```json
{
  "message": "Participação confirmada com sucesso"
}
```

## Códigos de Erro

A API utiliza os seguintes códigos de erro:

- `400 Bad Request`: Requisição inválida
- `401 Unauthorized`: Não autenticado
- `403 Forbidden`: Não autorizado
- `404 Not Found`: Recurso não encontrado
- `409 Conflict`: Conflito de dados
- `422 Unprocessable Entity`: Dados inválidos
- `500 Internal Server Error`: Erro interno do servidor

### Exemplo de Erro

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados inválidos",
    "details": [
      {
        "field": "email",
        "message": "E-mail inválido"
      }
    ]
  }
}
```

## Rate Limiting

A API implementa rate limiting para proteger contra abusos. Os limites são:

- 100 requisições por minuto para endpoints públicos
- 1000 requisições por minuto para endpoints autenticados

Os headers de resposta incluem:
- `X-RateLimit-Limit`: Limite total de requisições
- `X-RateLimit-Remaining`: Requisições restantes
- `X-RateLimit-Reset`: Timestamp de reset do limite

## Paginação

Endpoints que retornam listas utilizam paginação. Os parâmetros são:

- `page`: Número da página (começa em 1)
- `limit`: Itens por página (default: 10, max: 100)

A resposta inclui metadados de paginação:
```json
{
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

## Ordenação

Endpoints que suportam ordenação aceitam os parâmetros:

- `sort`: Campo para ordenação
- `order`: Direção da ordenação (asc/desc)

Exemplo:
```
GET /matches?sort=date&order=desc
```

## Filtros

Endpoints que suportam filtros aceitam parâmetros específicos para cada recurso.

Exemplo para partidas:
```
GET /matches?status=pending&date=2024-01-01
```

## Versionamento

A API é versionada através da URL. A versão atual é v1.

Exemplo:
```
https://api.futmatch.com/v1/matches
```

## Webhooks

A API suporta webhooks para notificações em tempo real. Para configurar:

1. Registre um webhook:
```http
POST /webhooks
```

**Request Body:**
```json
{
  "url": "https://seu-site.com/webhook",
  "events": ["match.created", "match.updated"]
}
```

2. Receba notificações no formato:
```json
{
  "event": "match.created",
  "data": {
    "id": "123",
    "titulo": "Pelada do Bairro",
    ...
  }
}
```

## Segurança

### HTTPS

Todas as requisições devem ser feitas via HTTPS.

### Tokens

- Tokens JWT expiram em 24 horas
- Refresh tokens expiram em 30 dias
- Tokens são invalidados no logout

### Validação

- Todos os inputs são validados
- Sanitização de dados é aplicada
- Proteção contra XSS e CSRF

## Suporte

Para suporte técnico:
- Email: suporte@futmatch.com
- Documentação: https://docs.futmatch.com
- Status: https://status.futmatch.com 