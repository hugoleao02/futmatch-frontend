import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Esporte, TipoPartida } from '../../../../domain/enums';
import type { PartidaRequest, PartidaUpdateRequest } from '../../../../domain/dtos';
import { useContainer } from '../../../../infra/di/useContainer';

interface PartidaFormState {
  nome: string;
  esporte: Esporte;
  latitude: number | '';
  longitude: number | '';
  data: string;
  hora: string;
  totalJogadores: number;
  tipoPartida: TipoPartida;
}

const initialFormState: PartidaFormState = {
  nome: '',
  esporte: Esporte.FUTEBOL,
  latitude: '',
  longitude: '',
  data: '',
  hora: '',
  totalJogadores: 10,
  tipoPartida: TipoPartida.PUBLICA,
};

export const useCriarPartida = () => {
  const { repositories } = useContainer();
  const navigate = useNavigate();
  const location = useLocation();
  const { id: partidaIdParam } = useParams<{ id: string }>();

  const partidaId = partidaIdParam || new URLSearchParams(location.search).get('id');
  const isEdit = Boolean(partidaId);

  const [form, setForm] = useState<PartidaFormState>(initialFormState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && partidaId) {
      const loadPartida = async () => {
        setLoading(true);
        try {
          const response = await repositories.partidaRepository.buscarPartidaPorId(Number(partidaId));
          const dt = new Date(response.dataHora);
          setForm(prev => ({
            ...prev,
            nome: response.nome,
            esporte: response.esporte as Esporte,
            latitude: response.latitude ?? '',
            longitude: response.longitude ?? '',
            data: dt.toISOString().split('T')[0] ?? '',
            hora: dt.toTimeString().slice(0, 5),
            totalJogadores: response.totalJogadores,
            tipoPartida: response.tipoPartida as TipoPartida,
          }));
        } catch {
          toast.error('Erro ao carregar dados da partida');
        } finally {
          setLoading(false);
        }
      };
      void loadPartida();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partidaId, isEdit]);

  const onChange = useCallback((field: keyof PartidaFormState, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const validate = useCallback((): boolean => {
    const errors: Record<string, string> = {};

    if (!form.nome.trim()) errors.nome = 'Nome é obrigatório';
    if (!form.latitude && form.latitude !== 0) errors.latitude = 'Latitude é obrigatória';
    if (!form.longitude && form.longitude !== 0) errors.longitude = 'Longitude é obrigatória';
    if (!form.data) errors.data = 'Data é obrigatória';
    if (!form.hora) errors.hora = 'Horário é obrigatório';
    if (!form.totalJogadores || form.totalJogadores < 2) errors.totalJogadores = 'Mínimo 2 jogadores';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [form]);

  const handleSubmit = useCallback(async () => {
    if (!validate()) return;

    setLoading(true);
    setError(null);

    try {
      const [ano, mes, dia] = form.data.split('-').map(Number);
      const [hora, minutos] = form.hora.split(':').map(Number);
      const dataHora = new Date(ano, mes - 1, dia, hora, minutos);

      if (dataHora <= new Date()) {
        throw new Error('A data e hora devem ser futuras');
      }

      const basePayload = {
        nome: form.nome,
        esporte: form.esporte,
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
        dataHora: dataHora.toISOString(),
        totalJogadores: form.totalJogadores,
        tipoPartida: form.tipoPartida,
      };

      if (isEdit && partidaId) {
        const updatePayload: PartidaUpdateRequest = {
          nome: basePayload.nome,
          esporte: basePayload.esporte,
          latitude: basePayload.latitude,
          longitude: basePayload.longitude,
          dataHora: dataHora.toISOString(),
          totalJogadores: basePayload.totalJogadores,
          tipoPartida: basePayload.tipoPartida,
        };
        await repositories.partidaRepository.atualizarPartida(Number(partidaId), updatePayload);
        toast.success('Partida atualizada com sucesso!');
      } else {
        const createPayload: PartidaRequest = {
          nome: basePayload.nome,
          esporte: basePayload.esporte,
          latitude: basePayload.latitude,
          longitude: basePayload.longitude,
          dataHora: basePayload.dataHora,
          totalJogadores: basePayload.totalJogadores,
          tipoPartida: basePayload.tipoPartida,
        };
        await repositories.partidaRepository.criarPartida(createPayload);
        toast.success('Partida criada com sucesso!');
      }

      navigate('/home');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro ao salvar partida';
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [form, isEdit, partidaId, navigate, validate, repositories.partidaRepository]);

  return {
    form,
    formErrors,
    loading,
    isEdit,
    error,
    onChange,
    onSubmit: handleSubmit,
    onBack: () => navigate(-1),
  };
};
