import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ROUTES } from '../../../../presentation/routes/routes';
import { useAuth } from '../../../../shared/hooks';

export const useHomeHandlers = () => {
  const navigate = useNavigate();
  const { logout: authLogout } = useAuth();
  const [anchorElCreateMenu, setAnchorElCreateMenu] = useState<HTMLElement | null>(null);
  const [openRecapModal, setOpenRecapModal] = useState(false);
  const [selectedMatchNameForRecap, setSelectedMatchNameForRecap] = useState('');

  const handleLogout = useCallback(() => {
    authLogout();
    toast.success('Logout realizado com sucesso!');
    navigate(ROUTES.LOGIN);
  }, [authLogout, navigate]);

  const handleProfileClick = useCallback(() => {
    toast.info('Funcionalidade de perfil em desenvolvimento');
  }, []);

  const handleOpenCreateMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCreateMenu(event.currentTarget);
  }, []);

  const handleCloseCreateMenu = useCallback(() => {
    setAnchorElCreateMenu(null);
  }, []);

  const handleCreateNewRoom = useCallback(() => {
    handleCloseCreateMenu();
    toast.info('Funcionalidade de criar sala em desenvolvimento');
  }, []);

  const handleCreateNewSoloMatch = useCallback(() => {
    handleCloseCreateMenu();
    navigate(ROUTES.MATCH.CREATE);
  }, [navigate]);

  const handleMatchDetailsClick = useCallback(
    (matchId: string) => {
      navigate(ROUTES.MATCH.DETAILS.replace(':id', matchId));
    },
    [navigate],
  );

  const handleRoomDetailsClick = useCallback((roomId: string) => {
    toast.info(`Detalhes da sala ${roomId} em desenvolvimento`);
  }, []);

  const handleOpenRecapModal = useCallback((matchName: string) => {
    setSelectedMatchNameForRecap(matchName);
    setOpenRecapModal(true);
  }, []);

  const handleCloseRecapModal = useCallback(() => {
    setOpenRecapModal(false);
    setSelectedMatchNameForRecap('');
  }, []);

  return {
    // Estado
    anchorElCreateMenu,
    openRecapModal,
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
