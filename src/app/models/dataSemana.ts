import { DataServico } from './dataServico';

export interface DataSemana {
  id: number;
  dia: string;
  horario: string;
  dataServicos: DataServico[];
}
