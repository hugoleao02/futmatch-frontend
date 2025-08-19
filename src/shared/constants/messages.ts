// Mensagens compartilhadas do sistema
export const MESSAGES = {
  // Mensagens de validação
  VALIDATION: {
    REQUIRED: 'Este campo é obrigatório',
    EMAIL_INVALID: 'Email inválido',
    PASSWORD_MIN: 'A senha deve ter pelo menos 6 caracteres',
    PASSWORD_MATCH: 'As senhas não coincidem',
    NAME_MIN: 'O nome deve ter pelo menos 2 caracteres',
  },
  
  // Mensagens de sucesso
  SUCCESS: {
    LOGIN: 'Login realizado com sucesso!',
    REGISTER: 'Cadastro realizado com sucesso!',
    PROFILE_UPDATE: 'Perfil atualizado com sucesso!',
    MATCH_CREATED: 'Partida criada com sucesso!',
    MATCH_JOINED: 'Você entrou na partida!',
  },
  
  // Mensagens de erro
  ERROR: {
    LOGIN_FAILED: 'Falha no login. Verifique suas credenciais.',
    REGISTER_FAILED: 'Falha no cadastro. Tente novamente.',
    NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
    UNAUTHORIZED: 'Você não tem permissão para esta ação.',
    NOT_FOUND: 'Recurso não encontrado.',
  },
  
  // Mensagens de confirmação
  CONFIRMATION: {
    DELETE_MATCH: 'Tem certeza que deseja excluir esta partida?',
    LEAVE_MATCH: 'Tem certeza que deseja sair desta partida?',
    DELETE_ACCOUNT: 'Tem certeza que deseja excluir sua conta?',
  },
} as const;
