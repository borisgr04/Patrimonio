import { MetodoPago, TipoPago } from './enums';

export interface Pago {
  id: string;
  contratoId: string;
  mesCorresponde: string;
  fechaPago: string;
  valorEsperado: number;
  valorPagado: number;
  tipoPago: TipoPago;
  metodoPago: MetodoPago;
  numeroComprobante?: string;
  saldoPendiente?: number;
  nota?: string;
  notificacionEnviada: boolean;
  createdAt: string;
}
