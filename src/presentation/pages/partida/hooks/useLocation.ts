import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { geocodingService } from '../../../../infra/services/geocoding';
import type { PlaceSuggestion } from '../../../../infra/services/geocoding';

export const useLocation = () => {
  const [fetchingAddress, setFetchingAddress] = useState(false);
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState<number | ''>('');
  const [longitude, setLongitude] = useState<number | ''>('');

  const useCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      toast.error('Geolocalizao no suportada pelo navegador');
      return;
    }

    setFetchingAddress(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lng);

        try {
          const addr = await geocodingService.reverseGeocode(lat, lng);
          if (addr) setAddress(addr);
        } catch {
          // silently ignore - coords still set
        } finally {
          setFetchingAddress(false);
        }
      },
      (error) => {
        setFetchingAddress(false);
        const messages: Record<number, string> = {
          1: 'Permisso de localizao negado. Permita o acesso e tente novamente.',
          2: 'No foi possvel obter a localizao. Verifique sua conexo.',
          3: 'Tempo esgotado ao buscar localizao. Tente novamente.',
        };
        toast.error(messages[error.code] || 'Erro ao obter localizao');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  const onPlaceSelect = useCallback((place: PlaceSuggestion) => {
    setLatitude(place.latitude);
    setLongitude(place.longitude);
    setAddress(place.display_name);
  }, []);

  const onClearLocation = useCallback(() => {
    setLatitude('');
    setLongitude('');
    setAddress('');
  }, []);

  return {
    address,
    latitude,
    longitude,
    fetchingAddress,
    useCurrentLocation,
    onPlaceSelect,
    onClearLocation,
  };
};
