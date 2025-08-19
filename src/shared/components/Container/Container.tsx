import { Container as MuiContainer } from '@mui/material';
import type { ContainerProps as MuiContainerProps } from '@mui/material';
import { forwardRef } from 'react';

export interface ContainerProps extends MuiContainerProps {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  padding?: 'none' | 'small' | 'medium' | 'large';
  margin?: 'none' | 'small' | 'medium' | 'large';
  centered?: boolean;
  fluid?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ 
    maxWidth = 'lg', 
    padding = 'medium', 
    margin = 'none',
    centered = true,
    fluid = false,
    children, 
    ...props 
  }, ref) => {
    const getSpacing = (type: 'padding' | 'margin') => {
      switch (type === 'padding' ? padding : margin) {
        case 'small':
          return type === 'padding' ? 2 : 1;
        case 'medium':
          return type === 'padding' ? 3 : 2;
        case 'large':
          return type === 'padding' ? 4 : 3;
        default:
          return 0;
      }
    };

    const containerMaxWidth = fluid ? false : maxWidth;

    return (
      <MuiContainer
        ref={ref}
        maxWidth={containerMaxWidth}
        {...props}
        sx={{
          padding: getSpacing('padding'),
          margin: getSpacing('margin'),
          display: 'flex',
          flexDirection: 'column',
          alignItems: centered ? 'center' : 'stretch',
          ...props.sx,
        }}
      >
        {children}
      </MuiContainer>
    );
  }
);

Container.displayName = 'Container';
