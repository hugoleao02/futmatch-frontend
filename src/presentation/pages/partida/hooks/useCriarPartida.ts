import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../../../infra/http/api.ts';
import { Esporte, TipoPartida } from '../../../../domain/enums';
import type { PartidaResponse } from '../../../../domain/dtos';

export const useCriarPartida = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [partidaId, setPartidaId] = useState<string | null>(null);

  const [form, setForm] = useState({
    nome: '',
    esporte: Esporte.FUTEBOL,
    localizacao: '',
    data: '',
    hora: '',
    totalJogadores: 10,
    tipoPartida: TipoPartida.PUBLICA,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (id) {
      setPartidaId(id);
      setIsEdit(true);
      setLoading(true);
      setLoading(false);
    }
  }, []);

  const onChange = (field: string, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };
  const validate = () => {
    const errors: Record<string, string> = {};

    if (!form.nome.trim()) errors.nome = 'Nome é obrigatório';
    if (!form.localizacao.trim()) errors.localizacao = 'Localização é obrigatória';
    if (!form.data) errors.data = 'Data é obrigatória';
    if (!form.hora) errors.hora = 'Horário é obrigatório';
    if (!form.totalJogadores || form.totalJogadores < 2) errors.totalJogadores = 'Mínimo 2 jogadores';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
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

      const payload = {
        nome: form.nome,
        esporte: form.esporte,
        dataHora: dataHora.toISOString(),
        totalJogadores: form.totalJogadores,
        tipoPartida: form.tipoPartida,
      };

      if (isEdit && partidaId) {
        await api.put<PartidaResponse>(`/partidas/${partidaId}`, payload);
        toast.success('Partida atualizada com sucesso!');
      } else {
        await api.post<PartidaResponse>('/partidas', payload);
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
  };

  return {
    form,
    formErrors,
    loading,
    isEdit,
    error,
    onChange,
    onSubmit: handleSubmit,
    onBack: () => navigate(-1),
    onUseCurrentLocation: () => { /* implementar depois */ },
    onOpenMapPicker: () => { /* implementar depois */ }
  };
};
