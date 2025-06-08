import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Participacao, PartidaRequest, PartidaResponse } from '../../../../core/types/api';
import { Esporte, TipoPartida } from '../../../../core/types/api';
import { api } from '../../../../infra/http/api';

interface MatchData {
  nome: string;
  esporte: Esporte;
  latitude: number;
  longitude: number;
  dataHora: string;
  totalJogadores: number;
  tipoPartida: TipoPartida;
  participantes: Participacao[];
}

// Mock de uma partida existente para simular carregamento
const mockExistingMatch: MatchData = {
  nome: 'Pelada do Bairro',
  esporte: Esporte.FUTEBOL,
  latitude: -23.55052,
  longitude: -46.633308,
  dataHora: '2024-03-20T19:00:00',
  totalJogadores: 10,
  tipoPartida: TipoPartida.PUBLICA,
  participantes: [],
};

export const useCreateEditMatch = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [esporte, setEsporte] = useState<Esporte>(Esporte.FUTEBOL);
  const [latitude, setLatitude] = useState<number>(-23.55052);
  const [longitude, setLongitude] = useState<number>(-46.633308);
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [totalJogadores, setTotalJogadores] = useState<number>(10);
  const [tipoPartida, setTipoPartida] = useState<TipoPartida>(TipoPartida.PUBLICA);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const matchId = new URLSearchParams(window.location.search).get('id');
    if (matchId) {
      setIsEdit(true);
      setLoading(true);

      // Carregando dados diretamente
      setNome(mockExistingMatch.nome);
      setEsporte(mockExistingMatch.esporte);
      setLatitude(mockExistingMatch.latitude);
      setLongitude(mockExistingMatch.longitude);
      const dataHora = new Date(mockExistingMatch.dataHora);
      setData(dataHora.toISOString().split('T')[0]);
      setHora(dataHora.toTimeString().slice(0, 5));
      setTotalJogadores(mockExistingMatch.totalJogadores);
      setTipoPartida(mockExistingMatch.tipoPartida);
      setLoading(false);
    }
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Validar se data e hora foram preenchidos
      if (!data || !hora) {
        throw new Error('Data e hora são obrigatórios');
      }

      // Garantir que a data e hora estejam no formato correto
      const [ano, mes, dia] = data.split('-').map(Number);
      const [horas, minutos] = hora.split(':').map(Number);

      // Validar se os valores são números válidos
      if (isNaN(ano) || isNaN(mes) || isNaN(dia) || isNaN(horas) || isNaN(minutos)) {
        throw new Error('Data ou hora inválida');
      }

      // Validar se a data é futura
      const dataHora = new Date(ano, mes - 1, dia, horas, minutos);
      const agora = new Date();

      if (dataHora <= agora) {
        throw new Error('A data e hora devem ser futuras');
      }

      // Formatar a data para o formato ISO que o backend espera
      const dataHoraFormatada = dataHora.toISOString();

      const partidaRequest: PartidaRequest = {
        nome,
        esporte,
        latitude,
        longitude,
        dataHora: dataHoraFormatada,
        totalJogadores,
        tipoPartida,
      };

      console.log('Enviando requisição:', partidaRequest);

      const response = await api.post<PartidaResponse>('/partidas', partidaRequest);

      if (response.status === 201) {
        navigate('/home');
      }
    } catch (error: any) {
      console.error('Erro ao salvar partida:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    nome,
    esporte,
    latitude,
    longitude,
    data,
    hora,
    totalJogadores,
    tipoPartida,
    loading,
    isEdit,
    error,
    handleNomeChange: setNome,
    handleEsporteChange: setEsporte,
    handleLatitudeChange: setLatitude,
    handleLongitudeChange: setLongitude,
    handleDataChange: setData,
    handleHoraChange: setHora,
    handleTotalJogadoresChange: setTotalJogadores,
    handleTipoPartidaChange: setTipoPartida,
    handleSubmit,
    handleBack,
  };
};
