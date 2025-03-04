import React from "react";
import { Box, Typography, useTheme, SxProps } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

interface LogoProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  showIcon?: boolean;
  iconSize?: number;
  sx?: SxProps;
  iconSx?: SxProps;
  textSx?: SxProps;
  darkMode?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  variant = "h6",
  showIcon = true,
  iconSize = 24,
  sx,
  iconSx,
  textSx,
  darkMode = false,
}) => {
  const theme = useTheme();

  const primaryColor = darkMode ? "white" : theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  return (
    <Box sx={{ display: "flex", alignItems: "center", ...sx }}>
      {showIcon && (
        <SportsSoccerIcon
          sx={{
            mr: 1,
            fontSize: iconSize,
            color: secondaryColor,
            ...iconSx,
          }}
        />
      )}
      <Typography
        variant={variant}
        component="span"
        sx={{
          fontWeight: "bold",
          letterSpacing: "-0.5px",
          ...textSx,
        }}
      >
        <Box component="span" sx={{ color: primaryColor }}>
          Fut
        </Box>
        <Box component="span" sx={{ color: secondaryColor }}>
          Match
        </Box>
      </Typography>
    </Box>
  );
};

export default Logo;
