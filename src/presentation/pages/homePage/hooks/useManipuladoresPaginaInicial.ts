import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { ROUTES } from '../../../../presentation/routes/routes';
import { useAuth } from '../../../../shared/hooks';
import { useModal } from '../../../../shared/hooks/useModal';
import { useNavigation } from '../../../../shared/hooks/useNavigation';

export const useHomeHandlers = () => {
  const { navigateWithToast } = useNavigation();
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
    navigateWithToast(ROUTES.LOGIN, 'Logout realizado com sucesso!', 'success');
  }, [authLogout, navigateWithToast]);

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

  const handleCreateNewRoom = useCallback(() => {
    closeCreateMenu();
    toast.info('Funcionalidade de criar sala em desenvolvimento');
  }, [closeCreateMenu]);

  const handleCreateNewSoloMatch = useCallback(() => {
    closeCreateMenu();
    navigateWithToast(ROUTES.MATCH.CREATE, 'Criando nova partida');
  }, [closeCreateMenu, navigateWithToast]);

  const handleMatchDetailsClick = useCallback(
    (matchId: string) => {
      navigateWithToast(
        ROUTES.MATCH.DETAILS.replace(':id', matchId),
        'Visualizando detalhes da partida',
      );
    },
    [navigateWithToast],
  );

  const handleRoomDetailsClick = useCallback((roomId: string) => {
    toast.info(`Detalhes da sala ${roomId} em desenvolvimento`);
  }, []);

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
    handleCreateNewRoom,
    handleCreateNewSoloMatch,
    handleMatchDetailsClick,
    handleRoomDetailsClick,
    handleOpenRecapModal,
    handleCloseRecapModal,
  };
};
