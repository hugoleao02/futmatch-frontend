import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import {
  subscribeToPhotoUpdates,
  useProfilePhoto,
} from "../../../hooks/useProfilePhoto";

export const useTopNavLogic = () => {
  const { user, logout } = useAuth();
  const {
    photoUrl,
    tempPhotoUrl,
    isLoading: isLoadingPhoto,
    updatePhoto,
    forceUpdate,
  } = useProfilePhoto();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  useEffect(() => {
    if (user) {
      updatePhoto();
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = subscribeToPhotoUpdates(() => {
      forceUpdate();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate("/perfil");
  };

  const handleLogout = () => {
    setOpenLogoutDialog(true);
  };

  const confirmLogout = () => {
    logout();
    handleClose();
    navigate("/login");
  };

  return {
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
  };
};
