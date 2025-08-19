# 🏗️ Estrutura Shared - FutMatch Frontend

## 🎯 Objetivo

A pasta `shared` centraliza todos os componentes, hooks, tipos, utilitários e constantes que são reutilizados em todo o sistema, seguindo os princípios SOLID e melhorando a organização do projeto.

## 📁 Estrutura da Pasta Shared

```
src/shared/
├── index.ts                    # Exporta tudo da pasta shared
├── components/                 # Componentes compartilhados
│   ├── Logo/                  # Componente Logo reutilizável
│   │   ├── Logo.tsx
│   │   ├── Logo.styles.ts
│   │   └── index.ts
│   └── index.ts
├── hooks/                     # Hooks compartilhados
│   ├── useConfiguracaoFormularios.ts
│   └── index.ts
├── types/                     # Tipos compartilhados
│   ├── formularios.ts
│   └── index.ts
├── utils/                     # Utilitários compartilhados
│   ├── validation.ts
│   ├── formatting.ts
│   └── index.ts
├── constants/                 # Constantes compartilhadas
│   ├── routes.ts
│   ├── messages.ts
│   └── index.ts
├── styles/                    # Estilos compartilhados
│   ├── baseStyles.ts
│   ├── theme.ts
│   └── index.ts
└── assets/                    # Assets compartilhados
    ├── logo.png
    └── index.ts
```

## 🚀 Como Usar

### **Importar de Qualquer Lugar do Sistema:**

```tsx
// Importar estilos base
import { baseTextFieldStyles, baseFormStyles } from '../shared';

// Importar tema
import { THEME } from '../shared';

// Importar tipos
import type { FormularioBaseProps } from '../shared';

// Importar utilitários
import { isValidEmail, formatName } from '../shared';

// Importar constantes
import { ROUTES, MESSAGES } from '../shared';

// Importar componentes
import { Logo } from '../shared';
```

### **Exemplo de Uso em Componentes:**

```tsx
import React from 'react';
import { TextField, Box } from '@mui/material';
import { 
  baseTextFieldStyles, 
  baseFormStyles, 
  THEME,
  isValidEmail 
} from '../shared';

const MeuFormulario = () => {
  const [email, setEmail] = useState('');
  
  const handleEmailChange = (value: string) => {
    if (isValidEmail(value)) {
      setEmail(value);
    }
  };

  return (
    <Box sx={baseFormStyles}>
      <TextField
        sx={baseTextFieldStyles}
        value={email}
        onChange={(e) => handleEmailChange(e.target.value)}
        label="Email"
        error={email && !isValidEmail(email)}
      />
    </Box>
  );
};
```

## 🔧 Benefícios da Estrutura Shared

### **1. Reutilização**
- Componentes, hooks e utilitários podem ser usados em qualquer parte do sistema
- Evita duplicação de código
- Padrões consistentes em todo o projeto

### **2. Manutenibilidade**
- Mudanças são feitas em um só lugar
- Fácil de encontrar e modificar funcionalidades compartilhadas
- Reduz o risco de inconsistências

### **3. Organização**
- Estrutura clara e lógica
- Fácil de navegar e entender
- Separação clara entre código específico e compartilhado

### **4. Escalabilidade**
- Novos módulos podem facilmente usar funcionalidades existentes
- Arquitetura preparada para crescimento
- Facilita a criação de novos recursos

## 📋 Regras para Adicionar ao Shared

### **✅ O que DEVE ir para shared:**
- Componentes reutilizáveis (Logo, Button, Input, etc.)
- Hooks genéricos (useLocalStorage, useApi, etc.)
- Tipos e interfaces comuns
- Utilitários de validação, formatação, etc.
- Constantes do sistema (rotas, mensagens, etc.)
- Estilos base e tema
- Assets compartilhados

### **❌ O que NÃO deve ir para shared:**
- Componentes específicos de uma funcionalidade
- Hooks com lógica de negócio específica
- Tipos específicos de uma entidade
- Utilitários específicos de uma funcionalidade
- Estilos específicos de um componente

## 🔄 Migração de Código Existente

### **Passo 1: Identificar o que é compartilhado**
- Analisar componentes e funcionalidades existentes
- Identificar o que é usado em múltiplos lugares
- Separar lógica genérica de específica

### **Passo 2: Mover para shared**
- Criar estrutura de pastas apropriada
- Mover arquivos mantendo imports
- Atualizar imports nos arquivos que usam

### **Passo 3: Refatorar se necessário**
- Tornar componentes mais genéricos
- Extrair lógica específica para hooks próprios
- Aplicar princípios SOLID

## 📚 Exemplos de Uso

### **Componente Logo:**
```tsx
// Em qualquer lugar do sistema
import { Logo } from '../shared';

<Logo size="small" />
<Logo size="large" />
```

### **Estilos Base:**
```tsx
// Aplicar estilos consistentes
<TextField sx={baseTextFieldStyles} />
<Button sx={baseSubmitButtonStyles}>Enviar</Button>
```

### **Utilitários:**
```tsx
// Validações e formatações consistentes
if (isValidEmail(email)) {
  const formattedName = formatName(user.name);
  // ...
}
```

### **Constantes:**
```tsx
// Mensagens e rotas padronizadas
navigate(ROUTES.DASHBOARD);
showMessage(MESSAGES.SUCCESS.LOGIN);
```

## 🎉 Resultado

A estrutura shared transforma o projeto em uma base de código mais:
- **Organizada**: Estrutura clara e lógica
- **Reutilizável**: Componentes e funcionalidades compartilhadas
- **Manutenível**: Mudanças centralizadas e previsíveis
- **Escalável**: Preparada para crescimento futuro
- **Consistente**: Padrões uniformes em todo o sistema

---

**Lembre-se**: A pasta shared é o coração do sistema. Mantenha-a limpa, bem organizada e sempre atualizada com as melhores práticas de desenvolvimento.
