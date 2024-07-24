import { DataSemana } from './dataSemana';
import { Servico } from './servico';

export interface DataServico {
  id: number;
  dataSemanaId: number;
  dataSemana: DataSemana;
  servicoId: number;
  servico: Servico;
}
