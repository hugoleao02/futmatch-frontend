export default {
  common: {
    startPlaying: "Start Playing",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    select: "Select",
    loading: "Loading...",
    learnMore: "Learn More",
    viewAll: "View All",
    join: "Join",
    searchPlaceholder: "Search matches, players or rooms...",
    profile: "Profile",
    settings: "Settings",
    createRoom: "Create Room",
    matches: "Matches",
    ranking: "Ranking",
    rooms: "Rooms",
    home: "Home",
  },
  navigation: {
    home: "Home",
    matches: "Matches",
    profile: "Profile",
    createMatch: "Create Match",
    logout: "Logout",
  },
  home: {
    title: "Welcome to FutMatch",
    subtitle: "Find your next casual match easily",
    features: {
      findMatches: {
        title: "Find Matches",
        description: "Search for nearby matches and join casual games.",
      },
      createRoom: {
        title: "Create Room",
        description: "Organize your own match and set the rules.",
      },
      ranking: {
        title: "Ranking",
        description: "Track your performance and climb the global ranking.",
      },
    },
  },
  matches: {
    title: "Available Matches",
    search: "Search matches",
    level: "Level",
    levels: {
      all: "All",
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
    },
    matchInfo: {
      players: "players",
      join: "Join",
    },
  },
  profile: {
    statistics: "Statistics",
    performance: "Performance",
    lastMatches: "Last Matches",
    stats: {
      matchesPlayed: "Matches Played",
      matchesOrganized: "Matches Organized",
      averageRating: "Average Rating",
      goals: "Goals",
      assists: "Assists",
      fairPlay: "Fair Play",
    },
    matchResults: {
      victory: "Victory",
      draw: "Draw",
      defeat: "Defeat",
    },
  },
  createMatch: {
    title: "Create New Room",
    form: {
      title: "Match Title",
      location: "Location",
      date: "Date",
      time: "Time",
      maxPlayers: "Maximum Players",
      level: "Level",
      description: "Description",
    },
  },
  auth: {
    login: {
      title: "Login",
      email: "Email",
      password: "Password",
      submit: "Login",
      registerLink: "Don't have an account? Register",
    },
    register: {
      title: "Create Account",
      nickname: "Nickname",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      position: "Position",
      skillLevel: "Skill Level (1-10)",
      submit: "Create Account",
      loginLink: "Already have an account? Login",
      positions: {
        goleiro: "Goalkeeper",
        zagueiro: "Defender",
        lateral: "Fullback",
        volante: "Defensive Midfielder",
        meia: "Midfielder",
        atacante: "Forward",
      },
      error: "Error creating account. Please try again.",
      validationError: "Please fill in all required fields.",
      serverError: "Server error. Please try again later.",
      emailExists: "This email is already in use.",
      successMessage: "Account created successfully! Please login to continue.",
      errors: {
        nicknameTooShort: "Nickname must be at least 3 characters",
      },
    },
    logout: {
      title: "Sign Out",
      confirm: "Are you sure you want to sign out?",
      confirmWithName: "{{name}}, are you sure you want to sign out?",
      confirmButton: "Sign Out",
      success: "You have successfully signed out",
    },
    validation: {
      required: "Required field",
      invalidEmail: "Invalid email",
      minPassword: "Password must be at least 6 characters",
      passwordFormat:
        "Password must contain at least one letter and one number",
      passwordMatch: "Passwords don't match",
      minNickname: "Nickname must be at least 3 characters",
      minSkillLevel: "Skill level must be between 1 and 10",
      maxSkillLevel: "Skill level must be between 1 and 10",
    },
    errors: {
      invalidCredentials: "Invalid email or password",
      serverError: "Server error. Please try again later.",
      networkError: "Connection error. Check your internet.",
      invalidEmail: "Invalid email",
      requiredField: "Required field",
      passwordTooShort: "Password must be at least 6 characters",
      passwordsDontMatch: "Passwords don't match",
    },
  },
  settings: {
    title: "Settings",
    notifications: {
      title: "Notifications",
      receiveNotifications: "Receive notifications",
      receiveNotificationsDescription:
        "Enable to receive notifications about matches, invites and important updates",
      emailNotifications: "Email notifications",
      emailNotificationsDescription:
        "Receive important updates via email about your matches and invites",
      pushNotifications: "Push notifications",
      pushNotificationsDescription:
        "Receive push notifications in your browser about real-time updates",
    },
    appearance: {
      title: "Appearance",
      theme: "Theme",
      themeDescription:
        "Choose between light theme (softer colors, ideal for daytime use), dark (reduces eye strain in low light environments) or follow your system settings",
      light: "Light",
      dark: "Dark",
      system: "System",
    },
    preferences: {
      title: "Preferences",
      preferredPosition: "Preferred Position",
      preferredPositionDescription:
        "Choose your preferred position on the field. This information will be used to suggest matches and form balanced teams",
    },
    privacy: {
      title: "Privacy",
      publicProfile: "Public profile",
      publicProfileDescription:
        "Allow other players to see your profile and basic information",
      showStatistics: "Show statistics",
      showStatisticsDescription:
        "Share your game statistics with other players (goals, assists, etc.)",
      showMatchHistory: "Show match history",
      showMatchHistoryDescription:
        "Allow other players to see your match history",
    },
    saveButton: "Save Settings",
  },
};
