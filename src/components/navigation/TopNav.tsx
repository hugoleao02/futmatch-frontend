import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useTopNavLogic } from "./hooks/useTopNavLogic";

const TopNav: React.FC = () => {
  const theme = useTheme();
  const {
    user,
    photoUrl,
    tempPhotoUrl,
    isLoadingPhoto,
    searchFocused,
    setSearchFocused,
    anchorEl,
    openLogoutDialog,
    t,
    handleMenu,
    handleClose,
    handleProfile,
    handleLogout,
    confirmLogout,
    navigate,
    setOpenLogoutDialog,
  } = useTopNavLogic();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        width: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "background.paper",
          px: 2,
          py: 1,
          borderRadius: 3,
          flexGrow: 1,
          maxWidth: 600,
          border: "2px solid",
          borderColor: searchFocused ? "primary.main" : "divider",
          boxShadow: searchFocused
            ? "0 4px 20px rgba(0,0,0,0.1)"
            : "0 2px 8px rgba(0,0,0,0.05)",
          transition: "all 0.3s ease",
        }}
      >
        <SearchIcon
          sx={{
            color: searchFocused ? "primary.main" : "text.secondary",
            transition: "color 0.3s ease",
          }}
        />
        <InputBase
          placeholder="Buscar partidas, jogadores ou salas..."
          sx={{
            ml: 2,
            flex: 1,
            "& input": {
              transition: "all 0.3s ease",
              fontSize: "1rem",
            },
          }}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleIcon />}
        onClick={() => navigate("/criar-sala")}
        sx={{
          borderRadius: 2,
          px: 3,
          py: 1,
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(40, 167, 69, 0.25)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(40, 167, 69, 0.35)",
          },
        }}
      >
        {t("common.createRoom")}
      </Button>
      {user && (
        <Tooltip title="Notificações">
          <IconButton
            sx={{
              color: "text.primary",
              transition: "all 0.3s ease",
              "&:hover": {
                color: "primary.main",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      )}

      {user && (
        <>
          <Tooltip title={t("common.userMenue")}>
            <IconButton onClick={handleMenu} sx={{ p: 0 }}>
              <Avatar
                src={tempPhotoUrl || photoUrl}
                sx={{
                  width: 40,
                  height: 40,
                  border: "2px solid",
                  borderColor: "primary.main",
                  bgcolor: theme.palette.primary.light,
                  opacity: isLoadingPhoto ? 0.7 : 1,
                  transition: "opacity 0.2s ease",
                }}
              >
                {!tempPhotoUrl &&
                  !photoUrl &&
                  user.nome?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfile}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              {t("common.userMenu")}
            </MenuItem>
            <MenuItem onClick={() => navigate("/configuracoes")}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              {t("common.settings")}
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <Typography>{t("auth.logout.title")}</Typography>
            </MenuItem>
          </Menu>
        </>
      )}

      <Dialog
        open={openLogoutDialog}
        onClose={() => setOpenLogoutDialog(false)}
      >
        <DialogTitle>{t("auth.logout.title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("auth.logout.confirm")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogoutDialog(false)} color="primary">
            {t("common.cancel")}
          </Button>
          <Button onClick={confirmLogout} color="error" autoFocus>
            {t("auth.logout.confirmButton")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TopNav;
