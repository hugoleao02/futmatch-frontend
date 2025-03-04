export default {
  common: {
    startPlaying: "Começar a Jogar",
    cancel: "Cancelar",
    save: "Salvar",
    edit: "Editar",
    delete: "Excluir",
    select: "Selecione",
    loading: "Carregando...",
    learnMore: "Saiba mais",
    viewAll: "Ver todos",
    join: "Participar",
    searchPlaceholder: "Buscar partidas, jogadores...",
  },
  navigation: {
    home: "Início",
    matches: "Partidas",
    profile: "Perfil",
    createMatch: "Criar Partida",
    logout: "Sair",
  },
  home: {
    title: "FutMatch",
    subtitle: "A melhor forma de organizar seu futebol",
    createMatch: "Criar Partida",
    featuresTitle: "Como funciona",
    featuredMatches: "Partidas em Destaque",
    joinCommunity: "Junte-se à Comunidade",
    joinCommunityText:
      "Milhares de jogadores já estão usando o FutMatch para encontrar e organizar partidas de futebol. Crie sua conta e comece a jogar!",
    getStarted: "Começar Agora",
    features: {
      findMatches: {
        title: "Encontre Partidas",
        description:
          "Busque peladas próximas a você e participe de jogos casuais.",
      },
      createRoom: {
        title: "Crie sua Sala",
        description: "Organize sua própria pelada e defina as regras do jogo.",
      },
      ranking: {
        title: "Ranking",
        description: "Acompanhe seu desempenho e suba no ranking global.",
      },
    },
  },
  matches: {
    title: "Partidas Disponíveis",
    subtitle: "Encontre jogos próximos a você ou crie sua própria partida",
    search: "Buscar partidas por nome ou local",
    nearbyMatches: "Partidas Próximas",
    noMatchesFound: "Nenhuma partida encontrada",
    noMatchesFoundText:
      "Não encontramos partidas com os filtros selecionados. Tente outros filtros ou crie sua própria partida.",
    level: "Nível",
    levels: {
      all: "Todos os níveis",
      beginner: "Iniciante",
      intermediate: "Intermediário",
      advanced: "Avançado",
    },
    matchInfo: {
      location: "Local",
      dateTime: "Data e Hora",
      players: "Jogadores",
      join: "Participar",
    },
  },
  profile: {
    statistics: "Estatísticas",
    performance: "Desempenho",
    lastMatches: "Últimas Partidas",
    notLoggedIn: "Você precisa estar logado para ver seu perfil.",
    stats: {
      matchesPlayed: "Partidas Jogadas",
      matchesOrganized: "Partidas Organizadas",
      averageRating: "Avaliação Média",
      goals: "Gols",
      assists: "Assistências",
      fairPlay: "Fair Play",
    },
    matchResults: {
      victory: "Vitória",
      draw: "Empate",
      defeat: "Derrota",
    },
  },
  createMatch: {
    title: "Criar Nova Partida",
    subtitle: "Preencha os dados para criar uma nova partida de futebol",
    steps: {
      basicInfo: "Informações Básicas",
      details: "Detalhes da Partida",
      review: "Revisão",
    },
    form: {
      title: "Título da Partida",
      titlePlaceholder: "Ex: Pelada no Parque",
      location: "Local da Partida",
      locationPlaceholder: "Ex: Quadra do Parque Central",
      date: "Data da Partida",
      time: "Horário",
      maxPlayers: "Máximo de Jogadores",
      selectQuantity: "Selecione a quantidade",
      level: "Nível da Partida",
      selectLevel: "Selecione o nível",
      description: "Descrição (opcional)",
      descriptionPlaceholder: "Descreva detalhes adicionais sobre a partida...",
      descriptionTooltip:
        "Adicione informações adicionais como regras específicas, equipamentos necessários, etc.",
      next: "Próximo",
      back: "Voltar",
      cancel: "Cancelar",
      create: "Criar Sala",
      reviewAlert: "Verifique os detalhes da sua partida antes de criar a sala",
    },
    review: {
      title: "Título",
      location: "Local",
      date: "Data",
      time: "Horário",
      maxPlayers: "Máximo de Jogadores",
      level: "Nível",
      description: "Descrição",
    },
  },
  auth: {
    login: {
      title: "Entrar",
      email: "E-mail",
      password: "Senha",
      submit: "Entrar",
      registerLink: "Não tem uma conta? Registre-se",
    },
    register: {
      title: "Criar Conta",
      nickname: "Apelido",
      email: "E-mail",
      password: "Senha",
      confirmPassword: "Confirmar Senha",
      position: "Posição",
      submit: "Criar Conta",
      loginLink: "Já tem uma conta? Entre",
      positions: {
        goleiro: "Goleiro",
        zagueiro: "Zagueiro",
        lateral: "Lateral",
        volante: "Volante",
        meia: "Meia",
        atacante: "Atacante",
      },
      error: "Erro ao criar conta. Tente novamente.",
      validationError: "Preencha todos os campos obrigatórios.",
      serverError: "Erro no servidor. Tente novamente mais tarde.",
      emailExists: "Este e-mail já está em uso.",
      successMessage: "Conta criada com sucesso! Faça login para continuar.",
      errors: {
        nicknameTooShort: "O apelido deve ter pelo menos 3 caracteres",
      },
    },
    logout: {
      title: "Sair da conta",
      confirm: "Tem certeza que deseja sair da sua conta?",
      confirmWithName: "{{name}}, tem certeza que deseja sair da sua conta?",
      confirmButton: "Sair",
      success: "Você saiu da sua conta com sucesso",
    },
    errors: {
      invalidCredentials: "E-mail ou senha inválidos",
      serverError: "Erro no servidor. Tente novamente mais tarde.",
      networkError: "Erro de conexão. Verifique sua internet.",
      invalidEmail: "E-mail inválido",
      requiredField: "Campo obrigatório",
      passwordTooShort: "A senha deve ter pelo menos 6 caracteres",
      passwordsDontMatch: "As senhas não coincidem",
    },
  },
  footer: {
    copyright: "© 2025 FutMatch - A melhor forma de organizar seu futebol",
  },
};
