export const SUCCESS_MESSAGES = {
  // Autenticação
  LOGIN: 'Login realizado com sucesso!',
  REGISTER: 'Cadastro realizado com sucesso!',
  LOGOUT: 'Logout realizado com sucesso!',

  // Partidas
  PARTIDA_CREATED: 'Partida criada com sucesso!',
  PARTIDA_UPDATED: 'Partida atualizada com sucesso!',
  PARTIDA_DELETED: 'Partida deletada com sucesso!',

  // Participação
  PARTICIPATION_REGISTERED: 'Participação registrada com sucesso!',
  PARTICIPATION_CANCELLED: 'Participação cancelada com sucesso!',
  PARTICIPATION_APPROVED: 'Participação aprovada com sucesso!',
  PARTICIPATION_REJECTED: 'Participação rejeitada com sucesso!',

  // Genéricas
  ITEM_CREATED: 'Item criado com sucesso!',
  ITEM_UPDATED: 'Item atualizado com sucesso!',
  ITEM_DELETED: 'Item deletado com sucesso!',
  OPERATION_SUCCESS: 'Operação realizada com sucesso!',
} as const;

export const ERROR_MESSAGES = {
  // Carregamento
  LOAD_PARTIDAS: 'Erro ao carregar partidas',
  LOAD_PARTIDAS_FUTURAS: 'Erro ao carregar partidas futuras',
  LOAD_PARTIDA_DETAILS: 'Erro ao carregar detalhes da partida',

  // Operações CRUD
  CREATE_PARTIDA: 'Erro ao criar partida',
  UPDATE_PARTIDA: 'Erro ao atualizar partida',
  DELETE_PARTIDA: 'Erro ao deletar partida',

  // Participação
  PARTICIPATE_PARTIDA: 'Erro ao participar da partida',
  CANCEL_PARTICIPATION: 'Erro ao cancelar participação',
  APPROVE_PARTICIPATION: 'Erro ao aprovar participação',
  REJECT_PARTICIPATION: 'Erro ao rejeitar participação',

  // Genéricas
  GENERIC_ERROR: 'Erro inesperado',
  NETWORK_ERROR: 'Erro de conexão',
  VALIDATION_ERROR: 'Erro de validação',
} as const;

export const USER_ACTIONS = {
  // Autenticação
  AUTH_EXPIRED: 'Faça login novamente',
  AUTH_DENIED: 'Verifique suas permissões',

  // Validação
  VALIDATION_CORRECT: 'Corrija os dados e tente novamente',
  VALIDATION_CHECK: 'Verifique os dados e tente novamente',

  // Rede
  NETWORK_CHECK: 'Verifique sua conexão e tente novamente',
  NETWORK_WAIT: 'Aguarde um momento e tente novamente',

  // Servidor
  SERVER_WAIT: 'Tente novamente em alguns minutos',
  SERVER_CONTACT: 'Entre em contato com o suporte',
} as const;
