import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ProfilePhotoService } from "../infrastructure/services/ProfilePhotoService";

interface ProfilePhotoStore {
  photoUrl: string;
  tempPhotoUrl: string | null;
  isLoading: boolean;
  lastUpdate: number;
  error: string | null;
  updatePhoto: () => Promise<void>;
  forceUpdate: () => Promise<void>;
  clearPhoto: () => void;
  setTempPhotoUrl: (url: string | null) => void;
  notifyPhotoUpdate: () => void;
}

const CACHE_DURATION = 5 * 60 * 1000;
let updatePromise: Promise<void> | null = null;
let subscribers: (() => void)[] = [];

const createStore: StateCreator<ProfilePhotoStore> = (set, get) => ({
  photoUrl: "",
  tempPhotoUrl: null,
  isLoading: false,
  lastUpdate: 0,
  error: null,
  setTempPhotoUrl: (url: string | null) => {
    set({ tempPhotoUrl: url, error: null });
    subscribers.forEach((callback) => callback());
  },
  notifyPhotoUpdate: () => {
    subscribers.forEach((callback) => callback());
  },
  updatePhoto: async () => {
    try {
      const now = Date.now();
      const lastUpdate = get().lastUpdate;
      const currentPhotoUrl = get().photoUrl;

      if (updatePromise) {
        await updatePromise;
        return;
      }

      if (now - lastUpdate < CACHE_DURATION && currentPhotoUrl) {
        return;
      }

      updatePromise = (async () => {
        set({ isLoading: true, error: null });

        if (currentPhotoUrl && currentPhotoUrl.startsWith("blob:")) {
          URL.revokeObjectURL(currentPhotoUrl);
        }

        const blob = await ProfilePhotoService.getProfilePhotoBlob();
        if (blob) {
          const url = URL.createObjectURL(blob);
          set({
            photoUrl: url,
            tempPhotoUrl: null,
            lastUpdate: now,
            error: null,
          });
          // Notifica outros componentes sobre a atualização
          subscribers.forEach((callback) => callback());
        } else {
          set({
            photoUrl: "",
            tempPhotoUrl: null,
            lastUpdate: now,
            error: "Não foi possível carregar a foto",
          });
        }
        set({ isLoading: false });
      })();

      await updatePromise;
      updatePromise = null;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao carregar a foto";
      set({
        photoUrl: "",
        tempPhotoUrl: null,
        lastUpdate: Date.now(),
        error: errorMessage,
        isLoading: false,
      });
      updatePromise = null;
    }
  },
  forceUpdate: async () => {
    try {
      if (updatePromise) {
        await updatePromise;
        return;
      }

      const currentPhotoUrl = get().photoUrl;
      if (currentPhotoUrl && currentPhotoUrl.startsWith("blob:")) {
        URL.revokeObjectURL(currentPhotoUrl);
      }

      updatePromise = (async () => {
        set({ isLoading: true, error: null });

        const blob = await ProfilePhotoService.getProfilePhotoBlob();
        if (blob) {
          const url = URL.createObjectURL(blob);
          set({
            photoUrl: url,
            tempPhotoUrl: null,
            lastUpdate: Date.now(),
            isLoading: false,
            error: null,
          });
          // Notifica outros componentes sobre a atualização forçada
          subscribers.forEach((callback) => callback());
        } else {
          set({
            photoUrl: "",
            tempPhotoUrl: null,
            lastUpdate: Date.now(),
            isLoading: false,
            error: "Não foi possível carregar a foto",
          });
        }
      })();

      await updatePromise;
      updatePromise = null;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao carregar a foto";
      set({
        photoUrl: "",
        tempPhotoUrl: null,
        lastUpdate: Date.now(),
        isLoading: false,
        error: errorMessage,
      });
      updatePromise = null;
    }
  },
  clearPhoto: () => {
    const state = get();
    if (state.photoUrl && state.photoUrl.startsWith("blob:")) {
      URL.revokeObjectURL(state.photoUrl);
    }
    set({
      photoUrl: "",
      tempPhotoUrl: null,
      lastUpdate: Date.now(),
      error: null,
    });
    // Notifica outros componentes sobre a limpeza
    subscribers.forEach((callback) => callback());
  },
});

// Função para adicionar subscribers
export const subscribeToPhotoUpdates = (callback: () => void) => {
  subscribers.push(callback);
  return () => {
    subscribers = subscribers.filter((cb) => cb !== callback);
  };
};

export const useProfilePhoto = create<ProfilePhotoStore>()(
  persist(createStore, {
    name: "profile-photo",
    storage: createJSONStorage(() => sessionStorage),
    partialize: (state) => ({ lastUpdate: state.lastUpdate }),
  })
);
