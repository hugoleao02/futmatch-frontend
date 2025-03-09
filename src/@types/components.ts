import { SxProps, Theme } from "@mui/material";

export interface LogoProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  darkMode?: boolean;
  iconSize?: number;
  showIcon?: boolean;
  sx?: SxProps<Theme>;
  textSx?: SxProps<Theme>;
  iconSx?: SxProps<Theme>;
  animated?: boolean;
}
