export interface Participacao {
  id: number;
  usuarioId: number;
  usuarioNome: string;
  partidaId: number;
  partidaNome: string;
  status: string;
  dataParticipacao: string;
}
