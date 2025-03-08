import React from "react";
import { Box, Typography, useTheme, SxProps, keyframes } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

interface LogoProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  showIcon?: boolean;
  iconSize?: number;
  sx?: SxProps;
  iconSx?: SxProps;
  textSx?: SxProps;
  darkMode?: boolean;
  animated?: boolean;
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const shine = keyframes`
  0% {
    background-position: -100% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
`;

const Logo: React.FC<LogoProps> = ({
  variant = "h6",
  showIcon = true,
  iconSize = 24,
  sx,
  iconSx,
  textSx,
  darkMode = false,
  animated = true,
}) => {
  const theme = useTheme();

  const primaryColor = darkMode ? "white" : theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const gradientText = {
    background: `linear-gradient(45deg, 
      ${primaryColor} 0%,
      ${theme.palette.primary.light} 20%,
      ${secondaryColor} 50%,
      ${theme.palette.secondary.light} 80%,
      ${secondaryColor} 100%)`,
    backgroundSize: "200% auto",
    backgroundClip: "text",
    textFillColor: "transparent",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    transition: "all 0.3s ease-in-out",
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        padding: "4px 8px",
        borderRadius: "8px",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
          transform: "translateY(-1px)",
        },
        "&:hover .logo-icon": {
          animation: animated ? `${rotate} 1.5s ease-in-out infinite` : "none",
        },
        "&:hover .logo-text": {
          animation: animated ? `${pulse} 1.5s ease-in-out infinite` : "none",
          "& span": {
            backgroundPosition: "200% center",
          },
        },
        ...sx,
      }}
    >
      {showIcon && (
        <SportsSoccerIcon
          className="logo-icon"
          sx={{
            mr: 1.5,
            fontSize: iconSize,
            color: secondaryColor,
            filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.2))",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "rotate(180deg) scale(1.1)",
              filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.3))",
            },
            ...iconSx,
          }}
        />
      )}
      <Typography
        variant={variant}
        component="span"
        className="logo-text"
        sx={{
          fontWeight: 800,
          letterSpacing: "0px",
          textTransform: "uppercase",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -2,
            left: 0,
            width: "0%",
            height: "2px",
            background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
            transition: "width 0.3s ease-in-out",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          },
          "&:hover::after": {
            width: "100%",
          },
          ...textSx,
        }}
      >
        <Box
          component="span"
          sx={{
            ...gradientText,
            filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.1))",
          }}
        >
          Fut
        </Box>
        <Box
          component="span"
          sx={{
            ...gradientText,
            filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.1))",
          }}
        >
          Match
        </Box>
      </Typography>
    </Box>
  );
};

export default Logo;
