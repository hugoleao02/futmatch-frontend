import { useRef } from "react";
import { useProfilePhoto } from "../../../hooks/useProfilePhoto";
import { useToast } from "../../../hooks/useToast";
import { ProfilePhotoService } from "../../../infrastructure/services";

export const usePerfilPhoto = () => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    photoUrl,
    tempPhotoUrl,
    isLoading: isLoadingPhoto,
    forceUpdate,
    error: photoError,
    setTempPhotoUrl,
  } = useProfilePhoto();

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Cria um preview imediato da foto
      const previewUrl = URL.createObjectURL(file);
      setTempPhotoUrl(previewUrl);

      // Faz o upload em segundo plano
      await ProfilePhotoService.uploadProfilePhoto(file);

      // Força atualização e notifica outros componentes
      await forceUpdate();
      useProfilePhoto.getState().notifyPhotoUpdate();

      showToast("Foto de perfil atualizada com sucesso", "success");
    } catch (error) {
      console.error("Erro ao atualizar foto:", error);
      showToast("Erro ao atualizar foto de perfil", "error");
      setTempPhotoUrl(null);
      // Em caso de erro, força atualização para mostrar a foto anterior
      await forceUpdate();
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  return {
    photoUrl,
    tempPhotoUrl,
    isLoadingPhoto,
    photoError,
    fileInputRef,
    handlePhotoUpload,
    handlePhotoClick,
  };
};
