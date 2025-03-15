import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Logo from "../common/Logo";
import { useNavigation } from "./hooks/useNavigation";
import { useUserProfile } from "./hooks/useUserProfile";

const Sidebar = () => {
  const theme = useTheme();
  const { user, photoUrl, tempPhotoUrl } = useUserProfile();
  const { navigate, menuItems, isActive } = useNavigation();

  return (
    <Box
      sx={{
        width: 280,
        height: "100%",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 20px rgba(0,0,0,0.05)",
      }}
    >
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: "white",
        }}
      >
        <Logo variant="h5" iconSize={40} darkMode={true} sx={{ mb: 2 }} />
      </Box>
      {user && (
        <>
          <Box
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              gap: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Avatar
              src={tempPhotoUrl || photoUrl}
              sx={{
                width: 48,
                height: 48,
                border: "3px solid",
                borderColor: "primary.main",
              }}
            />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {user.nome}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Box>
          <Divider />
        </>
      )}
      <List sx={{ p: 2, flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.path}
            onClick={() => navigate(item.path)}
            sx={{
              borderRadius: 2,
              mb: 1,
              bgcolor: isActive(item.path)
                ? `${theme.palette.primary.main}15`
                : "transparent",
            }}
          >
            <ListItemIcon
              sx={{
                color: isActive(item.path)
                  ? theme.palette.primary.main
                  : "text.secondary",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: isActive(item.path) ? 600 : 500,
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          p: 2,
          textAlign: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          FutMatch v1.0.0
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
