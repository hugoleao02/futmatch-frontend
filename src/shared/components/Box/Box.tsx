import { Box as MuiBox } from '@mui/material';
import type { BoxProps as MuiBoxProps } from '@mui/material';
import { forwardRef } from 'react';

export interface BoxProps extends MuiBoxProps {
  padding?: 'none' | 'small' | 'medium' | 'large';
  margin?: 'none' | 'small' | 'medium' | 'large';
  borderRadius?: 'none' | 'small' | 'medium' | 'large' | 'round';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  display?: 'block' | 'flex' | 'inline' | 'inline-block' | 'grid';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  gap?: 'none' | 'small' | 'medium' | 'large';
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ 
    padding = 'none', 
    margin = 'none', 
    borderRadius = 'none', 
    shadow = 'none',
    display = 'block',
    flexDirection = 'row',
    justifyContent = 'flex-start',
    alignItems = 'stretch',
    gap = 'none',
    children, 
    ...props 
  }, ref) => {
    const getSpacing = (type: 'padding' | 'margin') => {
      switch (type === 'padding' ? padding : margin) {
        case 'small':
          return type === 'padding' ? 1 : 1;
        case 'medium':
          return type === 'padding' ? 2 : 2;
        case 'large':
          return type === 'padding' ? 3 : 3;
        default:
          return 0;
      }
    };

    const getBorderRadius = () => {
      switch (borderRadius) {
        case 'small':
          return 1;
        case 'medium':
          return 2;
        case 'large':
          return 3;
        case 'round':
          return '50%';
        default:
          return 0;
      }
    };

    const getShadow = () => {
      switch (shadow) {
        case 'small':
          return 1;
        case 'medium':
          return 3;
        case 'large':
          return 8;
        default:
          return 0;
      }
    };

    const getGap = () => {
      switch (gap) {
        case 'small':
          return 1;
        case 'medium':
          return 2;
        case 'large':
          return 3;
        default:
          return 0;
      }
    };

    return (
      <MuiBox
        ref={ref}
        display={display}
        flexDirection={display === 'flex' ? flexDirection : undefined}
        justifyContent={display === 'flex' ? justifyContent : undefined}
        alignItems={display === 'flex' ? alignItems : undefined}
        gap={gap !== 'none' ? getGap() : undefined}
        {...props}
        sx={{
          padding: getSpacing('padding'),
          margin: getSpacing('margin'),
          borderRadius: getBorderRadius(),
          boxShadow: getShadow(),
          ...props.sx,
        }}
      >
        {children}
      </MuiBox>
    );
  }
);

Box.displayName = 'Box';
