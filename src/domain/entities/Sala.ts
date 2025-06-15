export interface Sala {
  id: string;
  nome: string;
  descricao: string;
  totalParticipantes: number;
  tipo: 'Pública' | 'Privada';
  avatar: string;
  partidaRecente: string;
}