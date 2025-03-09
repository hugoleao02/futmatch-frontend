import React from "react";
import { Typography, Box, SxProps, Theme } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

interface LogoProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  darkMode?: boolean;
  iconSize?: number;
  sx?: SxProps<Theme>;
  textSx?: SxProps<Theme>;
}

const Logo: React.FC<LogoProps> = ({
  variant = "h4",
  darkMode = false,
  iconSize = 32,
  sx,
  textSx,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        ...sx,
      }}
    >
      <SportsSoccerIcon
        sx={{
          fontSize: iconSize,
          color: darkMode ? "white" : "primary.main",
        }}
      />
      <Typography
        variant={variant}
        component="span"
        sx={{
          fontWeight: 700,
          color: darkMode ? "white" : "text.primary",
          ...textSx,
        }}
      >
        FutMatch
      </Typography>
    </Box>
  );
};

export default Logo;
