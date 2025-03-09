import React from "react";
import { Typography, Box } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

interface LogoProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  iconSize?: number;
}

const Logo: React.FC<LogoProps> = ({ variant = "h4", iconSize = 32 }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <SportsSoccerIcon sx={{ fontSize: iconSize, color: "primary.main" }} />
      <Typography
        variant={variant}
        component="span"
        sx={{
          fontWeight: 700,
          background: (theme) =>
            `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        FutMatch
      </Typography>
    </Box>
  );
};

export default Logo;
