import { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import {
  subscribeToPhotoUpdates,
  useProfilePhoto,
} from "../../../hooks/useProfilePhoto";

export const useUserProfile = () => {
  const { user } = useAuth();
  const {
    photoUrl,
    tempPhotoUrl,
    isLoading: isLoadingPhoto,
    updatePhoto,
    forceUpdate,
  } = useProfilePhoto();

  useEffect(() => {
    if (user) updatePhoto();
  }, [user]);

  useEffect(() => {
    const unsubscribe = subscribeToPhotoUpdates(forceUpdate);
    return () => unsubscribe();
  }, []);

  return { user, photoUrl, tempPhotoUrl, isLoadingPhoto };
};
