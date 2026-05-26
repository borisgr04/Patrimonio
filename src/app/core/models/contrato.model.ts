import { EstadoContrato, TipoContrato } from './enums';

export interface Contrato {
  id: string;
  numeroContrato: string;
  inmuebleId: string;
  arrendatarioId: string;
  codeudorId: string;
  fechaInicio: string;
  fechaFin: string;
  canonMensual: number;
  diaVencimientoPago: number;
  medioPago: string;
  tipoContrato: TipoContrato;
  direccionCorrespondencia?: string;
  valorDeposito?: number;
  ipcAnual?: number;
  canonConIPC?: number;
  estado: EstadoContrato;
  createdAt: string;
  updatedAt: string;
}
