# Componentes Padrão do Sistema

Este diretório contém os componentes padrão reutilizáveis que devem ser usados em todo o sistema, seguindo os princípios SOLID e as melhores práticas do React.

## Componentes Disponíveis

### Button
Componente de botão com diferentes variantes e tamanhos.

```tsx
import { Button } from '@shared/components';

// Variantes disponíveis
<Button variant="primary">Botão Primário</Button>
<Button variant="secondary">Botão Secundário</Button>
<Button variant="outline">Botão Outline</Button>
<Button variant="ghost">Botão Ghost</Button>
<Button variant="danger">Botão Perigo</Button>

// Tamanhos disponíveis
<Button size="small">Pequeno</Button>
<Button size="medium">Médio</Button>
<Button size="large">Grande</Button>

// Estados
<Button loading={true}>Carregando...</Button>
<Button disabled={true}>Desabilitado</Button>
```

### TextField
Campo de texto com validação e estilos consistentes.

```tsx
import { TextField } from '@shared/components';

<TextField
  label="Nome"
  name="nome"
  required
  error={hasError}
  helperText={errorMessage}
/>
```

### Typography
Componente de texto com diferentes variantes, pesos e cores.

```tsx
import { Typography } from '@shared/components';

// Variantes
<Typography variant="h1">Título Principal</Typography>
<Typography variant="body1">Texto do corpo</Typography>

// Pesos
<Typography weight="light">Texto leve</Typography>
<Typography weight="bold">Texto em negrito</Typography>

// Cores
<Typography color="primary">Texto primário</Typography>
<Typography color="error">Texto de erro</Typography>

// Alinhamento
<Typography align="center">Texto centralizado</Typography>
```

### Box
Container flexível com propriedades de layout pré-definidas.

```tsx
import { Box } from '@shared/components';

// Espaçamento
<Box padding="medium" margin="large">
  Conteúdo com espaçamento
</Box>

// Layout
<Box display="flex" justifyContent="center" alignItems="center">
  Conteúdo centralizado
</Box>

// Sombras e bordas
<Box shadow="medium" borderRadius="medium">
  Card com sombra
</Box>
```

### Container
Container responsivo com largura máxima e centralização.

```tsx
import { Container } from '@shared/components';

<Container maxWidth="lg" padding="medium">
  Conteúdo centralizado com largura máxima
</Container>

<Container fluid padding="large">
  Container de largura total
</Container>
```

## Princípios de Uso

1. **Sempre use os componentes padrão** em vez de componentes do MUI diretamente
2. **Mantenha a consistência** usando as variantes e tamanhos pré-definidos
3. **Personalize apenas quando necessário** usando a prop `sx`
4. **Siga o design system** estabelecido para cores, espaçamentos e tipografia

## Extensibilidade

Os componentes são projetados para serem extensíveis:
- Use a prop `sx` para estilos customizados
- Herde das interfaces TypeScript para props adicionais
- Mantenha a compatibilidade com o MUI subjacente

## Exemplo de Uso Completo

```tsx
import { Button, TextField, Typography, Box, Container } from '@shared/components';

export const FormularioExemplo = () => {
  return (
    <Container maxWidth="md" padding="large">
      <Box display="flex" flexDirection="column" gap="medium">
        <Typography variant="h2" weight="bold" color="primary" align="center">
          Formulário de Exemplo
        </Typography>
        
        <TextField
          label="Nome completo"
          required
          fullWidth
        />
        
        <TextField
          label="E-mail"
          type="email"
          required
          fullWidth
        />
        
        <Button variant="primary" size="large" fullWidth>
          Enviar
        </Button>
      </Box>
    </Container>
  );
};
```
