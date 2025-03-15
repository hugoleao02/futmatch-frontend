import { useRef, useState } from "react";
import { useProfilePhoto } from "../../../hooks/useProfilePhoto";
import { useToast } from "../../../hooks/useToast";
import { ProfilePhotoService } from "../../../infrastructure/services";

export const usePerfilPhoto = () => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");
  const {
    photoUrl,
    tempPhotoUrl,
    isLoading: isLoadingPhoto,
    forceUpdate,
    error: photoError,
    setTempPhotoUrl,
  } = useProfilePhoto();

  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setSelectedImageUrl(imageUrl);
    setIsEditorOpen(true);
  };

  const handleEditorClose = () => {
    setIsEditorOpen(false);
    if (selectedImageUrl) {
      URL.revokeObjectURL(selectedImageUrl);
    }
    setSelectedFile(null);
    setSelectedImageUrl("");
  };

  const handlePhotoUpload = async (editedImageBlob: Blob) => {
    try {
      // Criar um File a partir do Blob editado
      const editedFile = new File(
        [editedImageBlob],
        selectedFile?.name || "profile-photo.jpg",
        {
          type: "image/jpeg",
        }
      );

      // Criar preview temporário
      const previewUrl = URL.createObjectURL(editedImageBlob);
      setTempPhotoUrl(previewUrl);

      // Upload da foto editada
      await ProfilePhotoService.uploadProfilePhoto(editedFile);

      // Atualizar estado
      await forceUpdate();
      useProfilePhoto.getState().notifyPhotoUpdate();

      showToast("Foto de perfil atualizada com sucesso", "success");
    } catch (error) {
      console.error("Erro ao atualizar foto:", error);
      showToast("Erro ao atualizar foto de perfil", "error");
      setTempPhotoUrl(null);
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
    isEditorOpen,
    selectedImageUrl,
    handlePhotoSelect,
    handlePhotoUpload,
    handlePhotoClick,
    handleEditorClose,
  };
};
