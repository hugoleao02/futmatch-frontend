export default {
  common: {
    startPlaying: "Começar a Jogar",
    cancel: "Cancelar",
    save: "Salvar",
    edit: "Editar",
    delete: "Excluir",
    select: "Selecionar",
    loading: "Carregando...",
    learnMore: "Saiba mais",
    viewAll: "Ver todos",
    join: "Participar",
    searchPlaceholder: "Buscar partidas, jogadores ou salas...",
    profile: "Perfil",
    settings: "Configurações",
    createRoom: "Criar Sala",
    matches: "Partidas",
    ranking: "Ranking",
    rooms: "Salas",
    home: "Início",
  },
  navigation: {
    home: "Início",
    matches: "Partidas",
    profile: "Perfil",
    createMatch: "Criar Partida",
    logout: "Sair",
    createRoom: "Criar Sala",
    ranking: "Ranking",
    rooms: "Salas",
  },
  home: {
    title: "FutMatch",
    subtitle: "Organize suas peladas de forma fácil e rápida",
    createMatch: "Criar Sala",
    features: {
      title: "Como funciona",
      findMatches: {
        title: "Encontre Peladas",
        description:
          "Encontre peladas próximas a você e participe de jogos no seu nível.",
      },
      createRoom: {
        title: "Crie sua Sala",
        description: "Organize sua própria pelada e defina as regras do jogo.",
      },
      ranking: {
        title: "Ranking",
        description: "Acompanhe seu desempenho e evolua seu nível.",
      },
    },
    featuredMatches: {
      title: "Partidas em Destaque",
      empty: "Nenhuma partida em destaque no momento",
    },
    joinCommunity: "Entre para a Comunidade",
    joinCommunityText:
      "Milhares de jogadores já estão usando o FutMatch para encontrar e organizar peladas. Crie sua conta e comece a jogar!",
    getStarted: "Começar Agora",
  },
  matches: {
    title: "Partidas",
    buscar: "Buscar partidas",
    nivel: "Nível",
    noTitle: "Sem título",
    playersConfirmed: "jogadores confirmados",
    viewDetails: "Ver detalhes",
    next: "Próximas",
    mine: "Minhas",
    noMatch: "Nenhuma partida encontrada",
    soon: "Em breve",
    niveis: {
      iniciante: "Iniciante",
      intermediario: "Intermediário",
      avancado: "Avançado",
    },
    levels: {
      all: "Todos os níveis",
    },
    subtitle: "Encontre jogos próximos a você ou crie sua própria pelada",
    search: "Buscar partidas por nome ou local",
    nearbyMatches: "Partidas Próximas",
    noMatchesFound: "Nenhuma partida encontrada",
    noMatchesFoundText:
      "Não encontramos partidas com os filtros selecionados. Tente outros filtros ou crie sua própria pelada.",
    level: "Nível",
    matchInfo: {
      location: "Local",
      dateTime: "Data e Hora",
      players: "Jogadores",
      join: "Participar",
      fairPlay: "Fair Play",
      requiredLevel: "Nível Necessário",
    },
  },
  profile: {
    statistics: "Estatísticas",
    performance: "Desempenho",
    lastMatches: "Últimas Partidas",
    notLoggedIn: "Faça login para ver seu perfil",
    editProfile: "Editar Perfil",
    stats: {
      matchesPlayed: "Partidas Jogadas",
      matchesOrganized: "Partidas Organizadas",
      averageRating: "Avaliação Média",
      goals: "Gols",
      assists: "Assistências",
      fairPlay: "Fair Play",
      level: "Nível",
      position: "Posição",
      winRate: "Taxa de Vitória",
    },
    matchResults: {
      victory: "Vitória",
      draw: "Empate",
      defeat: "Derrota",
    },
    badges: {
      title: "Conquistas",
      organizer: "Organizador",
      scorer: "Artilheiro",
      fairPlay: "Fair Play",
      veteran: "Veterano",
      premium: "Premium",
    },
  },
  createMatch: {
    title: "Criar Nova Pelada",
    subtitle: "Configure sua pelada em poucos passos",
    steps: {
      basicInfo: "Informações Básicas",
      details: "Detalhes da Pelada",
      review: "Revisão",
    },
    form: {
      title: "Nome da Pelada",
      titlePlaceholder: "Ex: Pelada dos Amigos",
      location: "Local da Pelada",
      locationPlaceholder: "Ex: Quadra do Parque Central",
      date: "Data",
      time: "Horário",
      maxPlayers: "Número de Jogadores",
      selectQuantity: "Selecione a quantidade",
      level: "Nível da Pelada",
      selectLevel: "Selecione o nível",
      fairPlayMinimum: "Fair Play Mínimo",
      description: "Descrição (opcional)",
      descriptionPlaceholder: "Informações adicionais sobre a pelada...",
      descriptionTooltip:
        "Adicione regras específicas, equipamentos necessários, etc.",
      requiredPositions: "Posições Necessárias",
      positionLimits: {
        title: "Limite de Jogadores por Posição",
        description: "Defina quantos jogadores você precisa em cada posição",
        GOLEIRO: "Goleiros necessários",
        ZAGUEIRO: "Zagueiros necessários",
        LATERAL: "Laterais necessários",
        VOLANTE: "Volantes necessários",
        MEIA: "Meias necessários",
        ATACANTE: "Atacantes necessários",
        minimum: "Mínimo",
        maximum: "Máximo",
        total: "Total de jogadores",
        errors: {
          exceedsTotal:
            "O total de jogadores por posição excede o limite da sala",
          invalidNumber: "Número inválido de jogadores",
          minimumRequired: "É necessário pelo menos {{min}} jogador(es)",
          maximumAllowed: "Máximo de {{max}} jogadores permitido",
        },
      },
      next: "Próximo",
      back: "Voltar",
      cancel: "Cancelar",
      create: "Criar Sala",
      reviewAlert: "Confira os detalhes antes de criar a sala",
      roomType: "Tipo de Sala",
      roomTypes: {
        public: "Pública",
        private: "Privada",
      },
      autoAccept: "Aceitar jogadores automaticamente",
    },
    review: {
      title: "Nome",
      location: "Local",
      date: "Data",
      time: "Horário",
      maxPlayers: "Número de Jogadores",
      level: "Nível",
      description: "Descrição",
      fairPlayMinimum: "Fair Play Mínimo",
      requiredPositions: "Posições Necessárias",
      positionLimits: "Limite por Posição",
      roomType: "Tipo de Sala",
      autoAccept: "Aceitação Automática",
    },
  },
  auth: {
    login: {
      title: "Entrar",
      email: "Email",
      password: "Senha",
      submit: "Entrar",
      forgotPassword: "Esqueceu sua senha?",
      noAccount: "Não tem uma conta? Registre-se",
      or: "ou",
    },
    register: {
      title: "Criar Conta",
      nickname: "Nome",
      email: "Email",
      password: "Senha",
      confirmPassword: "Confirmar Senha",
      position: "Posição",
      submit: "Registrar",
      hasAccount: "Já tem uma conta? Entre",
      successMessage: "Conta criada com sucesso! Faça login para continuar.",
      error: "Erro ao criar conta. Tente novamente.",
      errors: {
        positionRequired: "Selecione uma posição",
      },
    },
    logout: {
      title: "Sair da conta",
      confirm: "Tem certeza que deseja sair?",
      confirmWithName: "{{name}}, tem certeza que deseja sair?",
      confirmButton: "Sair",
      success: "Você saiu com sucesso",
    },
    errors: {
      invalidCredentials: "Email ou senha inválidos",
    },
  },
  footer: {
    copyright: "© 2024 FutMatch - Organize suas peladas de forma fácil",
    terms: "Termos de Uso",
    privacy: "Política de Privacidade",
    contact: "Contato",
  },
  validation: {
    required: "Campo obrigatório",
    email: "Formato de email inválido",
    minLength: "Deve ter no mínimo {{min}} caracteres",
    maxLength: "Deve ter no máximo {{max}} caracteres",
    passwordFormat: "A senha deve conter pelo menos uma letra e um número",
    passwordMatch: "As senhas não conferem",
  },
  data: {
    hoje: "Hoje",
    amanha: "Amanhã",
  },
};
