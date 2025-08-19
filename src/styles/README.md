# Estilos Base - FutMatch Frontend

Este diretório contém os estilos base organizados para o projeto FutMatch.

## Estrutura

### `baseStyles.ts`
Contém todos os estilos base reutilizáveis:
- `baseTextFieldStyles` - Estilos para campos de texto
- `baseFormStyles` - Estilos para formulários
- `baseTitleStyles` - Estilos para títulos
- `baseSubmitButtonStyles` - Estilos para botões de submit
- `baseCheckboxStyles` - Estilos para checkboxes
- `baseLinkStyles` - Estilos para links
- `baseContainerStyles` - Estilos para containers
- `basePaperStyles` - Estilos para cards/papers

### `constants/theme.ts`
Contém todas as constantes de tema:
- Cores (primária, secundária, texto, background)
- Tipografia (tamanhos de fonte, pesos)
- Border radius
- Sombras
- Espaçamentos

## Como usar

```tsx
import { baseTextFieldStyles, baseFormStyles } from '../styles';

// Em um componente
<TextField sx={baseTextFieldStyles} />
<Box sx={baseFormStyles}>
  {/* conteúdo do formulário */}
</Box>
```

## Benefícios

1. **Consistência**: Todos os componentes usam os mesmos estilos base
2. **Manutenibilidade**: Mudanças no tema são feitas em um só lugar
3. **Reutilização**: Estilos podem ser importados e usados em qualquer componente
4. **Organização**: Código limpo e bem estruturado
5. **TypeScript**: Tipagem completa com Material-UI
