import { TipoContrato } from '../../../core/models/enums';

export interface ContratoFormValue {
  inmuebleId: string;
  fechaInicio: string;
  fechaFin: string;
  canonMensual: number;
  diaVencimientoPago: number;
  medioPago: string;
  tipoContrato: TipoContrato;
  direccionCorrespondencia: string;
  valorDeposito: number;
  ipcAnual: number;
}
