export const AUTH_ERRORS = {
  REQUIRED_FIELDS: 'Email e senha são obrigatórios',
  INVALID_EMAIL: 'Email inválido',
  INVALID_CREDENTIALS: 'Credenciais inválidas',
  USER_NOT_FOUND: 'Usuário não encontrado',
  EMAIL_ALREADY_EXISTS: 'Email já cadastrado',
  INVALID_TOKEN: 'Token inválido ou expirado',
  PASSWORD_TOO_WEAK: 'A senha deve ter pelo menos 8 caracteres',
  PASSWORDS_DONT_MATCH: 'As senhas não coincidem',
  ACCOUNT_LOCKED: 'Conta bloqueada por tentativas excessivas',
  EMAIL_NOT_VERIFIED: 'Email não verificado',
} as const;

export const VALIDATION_ERRORS = {
  REQUIRED_FIELD: 'Campo obrigatório',
  INVALID_FORMAT: 'Formato inválido',
  MIN_LENGTH: 'Tamanho mínimo não atingido',
  MAX_LENGTH: 'Tamanho máximo excedido',
  INVALID_VALUE: 'Valor inválido',
} as const;

export const API_ERRORS = {
  NETWORK_ERROR: 'Erro de conexão',
  SERVER_ERROR: 'Erro interno do servidor',
  TIMEOUT: 'Tempo de resposta excedido',
  UNAUTHORIZED: 'Não autorizado',
  FORBIDDEN: 'Acesso negado',
  NOT_FOUND: 'Recurso não encontrado',
  CONFLICT: 'Conflito de dados',
} as const;
