import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useAuth, useModal, useNavigation } from '../../../../shared/hooks';
import { ROUTES } from '../../../routes/routes.tsx';

export const useHomeHandlers = () => {
  const { navigate } = useNavigation();
  const { logout: authLogout } = useAuth();
  const {
    isOpen: isCreateMenuOpen,
    open: openCreateMenu,
    close: closeCreateMenu,
  } = useModal<HTMLElement>();
  const {
    isOpen: isRecapModalOpen,
    data: selectedMatchNameForRecap,
    open: openRecapModal,
    close: closeRecapModal,
  } = useModal<string>();

  const handleLogout = useCallback(() => {
    authLogout();
    navigate(ROUTES.LOGIN);
  }, [authLogout, navigate]);

  const handleProfileClick = useCallback(() => {
    toast.info('Funcionalidade de perfil em desenvolvimento');
  }, []);

  const handleOpenCreateMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      openCreateMenu(event.currentTarget);
    },
    [openCreateMenu],
  );

  const handleCloseCreateMenu = useCallback(() => {
    closeCreateMenu();
  }, [closeCreateMenu]);

  const handleCreateNewSoloMatch = useCallback(() => {
    closeCreateMenu();
    navigate(ROUTES.MATCH.CREATE);
  }, [closeCreateMenu, navigate]);

  const handleMatchDetailsClick = useCallback(
    (matchId: string) => {
      navigate(ROUTES.MATCH.DETAILS.replace(':id', matchId));
    },
    [navigate],
  );

  const handleOpenRecapModal = useCallback(
    (matchName: string) => {
      openRecapModal(matchName);
    },
    [openRecapModal],
  );

  const handleCloseRecapModal = useCallback(() => {
    closeRecapModal();
  }, [closeRecapModal]);

  return {
    // Estado
    anchorElCreateMenu: isCreateMenuOpen,
    openRecapModal: isRecapModalOpen,
    selectedMatchNameForRecap,

    // Handlers
    handleLogout,
    handleProfileClick,
    handleOpenCreateMenu,
    handleCloseCreateMenu,
    handleCreateNewSoloMatch,
    handleMatchDetailsClick,
    handleOpenRecapModal,
    handleCloseRecapModal,
  };
};
