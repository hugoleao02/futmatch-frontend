import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box } from '@mui/material';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { geocodingService, type PlaceSuggestion } from '../../../../infra/services/geocoding';

interface AddressAutocompleteProps {
  value: string;
  onChange: (place: PlaceSuggestion) => void;
  onClear: () => void;
  error?: boolean;
  helperText?: string;
  loading?: boolean;
}

export const AddressAutocomplete = ({
  value,
  onChange,
  onClear,
  error,
  helperText,
  loading: submitting,
}: AddressAutocompleteProps) => {
  const [options, setOptions] = useState<PlaceSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const id = useId();

  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  // Stable refs for callbacks to avoid stale closures
  const onChangeRef = useRef(onChange);
  const onClearRef = useRef(onClear);
  useEffect(() => {
    onChangeRef.current = onChange;
    onClearRef.current = onClear;
  }, [onChange, onClear]);

  // Request user location once on mount
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => { },
      { enableHighAccuracy: false, timeout: 5000 }
    );
  }, []);

  const fetchSuggestions = useCallback(async (query: string) => {
    try {
      setLoading(true);
      const results = await geocodingService.searchPlaces(query, userLocation);
      setOptions(results);
    } catch {
      setOptions([]);
    } finally {
      setLoading(false);
    }
  }, [userLocation]);

  useEffect(() => {
    if (inputValue.trim().length < 2) return;
    const query = inputValue.trim();
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { fetchSuggestions(query); }, 500);
  }, [inputValue, fetchSuggestions]);

  const handleInputChange = useCallback((_: unknown, newInput: string, reason: string) => {
    // Ignore "reset" and "selectOption" events — we handle those in handleSelect
    if (reason === 'reset' || reason === 'selectOption') return;
    setInputValue(newInput);
    if (newInput.trim().length < 2) {
      setOptions([]);
      if (newInput.trim().length === 0) {
        onClearRef.current();
      }
    }
  }, []);

  const handleSelect = useCallback((_: unknown, selected: PlaceSuggestion | null) => {
    if (selected) {
      onChangeRef.current(selected);
      setInputValue(selected.short_name);
    } else {
      onClearRef.current();
    }
  }, []);

  // Sync inputValue when external value prop changes (e.g., edit mode)
  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Autocomplete
      id={id}
      key="address-autocomplete"
      options={options}
      loading={loading}
      inputValue={inputValue}
      onChange={handleSelect}
      onInputChange={handleInputChange}
      filterOptions={(x) => x}
      autoHighlight
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.display_name)}
      noOptionsText="Nenhum resultado encontrado"
      loadingText="Buscando endereos..."
      disabled={submitting}
      freeSolo
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          key={option.id}
          sx={{ gap: 1, alignItems: 'flex-start' }}
        >
          <LocationOnIcon
            color="action"
            sx={{ flexShrink: 0, mt: 0.5, color: 'text.secondary' }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box component="span" sx={{ fontWeight: 500, lineHeight: 1.3 }}>
              {option.short_name}
            </Box>
            <Box
              component="span"
              sx={{ fontSize: '0.75rem', color: 'text.secondary', lineHeight: 1.3 }}
            >
              {option.display_name}
            </Box>
          </Box>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Localizao (Endereo, Quadra, Ponto de Referencia)"
          required
          error={error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      sx={{
        '& .MuiOutlinedInput-root': {
          '&:hover fieldset': { borderColor: '#1B5E20' },
          '&.Mui-focused fieldset': { borderColor: '#1B5E20' },
        },
      }}
    />
  );
};
