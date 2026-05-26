import { Contrato } from '../models/contrato.model';
import { Pago } from '../models/pago.model';
import { EstadoContrato } from '../models/enums';
import { diferenciaEnDias, obtenerMesActual } from './date.util';

export function calcularCanonConIPC(canon: number, ipc: number): number {
  return Math.round(canon * (1 + ipc / 100));
}

export function calcularFechaVencimientoMes(contrato: Contrato, referencia = new Date()): string {
  const year = referencia.getFullYear();
  const month = referencia.getMonth();
  const ultimoDia = new Date(year, month + 1, 0).getDate();
  const dia = Math.min(contrato.diaVencimientoPago, ultimoDia);
  return new Date(year, month, dia).toISOString().slice(0, 10);
}

export function calcularDiasVencimiento(contrato: Contrato, referencia = new Date()): number {
  return diferenciaEnDias(calcularFechaVencimientoMes(contrato, referencia), referencia);
}

export function estaEnMora(contrato: Contrato, pagos: Pago[], referencia = new Date()): boolean {
  if (contrato.estado !== EstadoContrato.ACTIVO) {
    return false;
  }

  const pagoMes = pagos.find(
    (pago) => pago.contratoId === contrato.id && pago.mesCorresponde === obtenerMesActual(),
  );
  const cubierto = (pagoMes?.valorPagado ?? 0) >= contrato.canonMensual;
  return calcularDiasVencimiento(contrato, referencia) < 0 && !cubierto;
}

export function proximosAVencer(
  contratos: Contrato[],
  dias: number,
  referencia = new Date(),
): Contrato[] {
  return contratos.filter((contrato) => {
    if (contrato.estado !== EstadoContrato.ACTIVO) {
      return false;
    }

    const faltantes = calcularDiasVencimiento(contrato, referencia);
    return faltantes >= 0 && faltantes <= dias;
  });
}
