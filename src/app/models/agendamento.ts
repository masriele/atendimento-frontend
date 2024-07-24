import { Atendente } from './atendente';
import { DataServico } from './dataServico';
import { Paciente } from './paciente';

export interface Agendamento {
  id: number;
  pacientId: number;
  paciente: Paciente;
  atendenteId: number;
  atendente: Atendente;
  dataServicoId: number;
  dataServico: DataServico;
}