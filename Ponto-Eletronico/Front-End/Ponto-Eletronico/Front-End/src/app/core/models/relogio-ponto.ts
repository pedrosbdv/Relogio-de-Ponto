export interface RelogioPonto {
  id: number;
  usuarioId: number;
  usuario: {
    id: number;
    nome: string;
    email: string;
  };
  dataHoraEntrada: string;
  dataHoraSaida?: string;
}
