import { Injectable } from '@angular/core';
import { Contrato } from '../models/contrato.model';
import { Pago } from '../models/pago.model';
import {
  calcularCanonConIPC,
  calcularDiasVencimiento,
  estaEnMora,
  proximosAVencer,
} from '../utils/ipc.util';

@Injectable({ providedIn: 'root' })
export class IpcService {
  calcularCanonConIPC(canon: number, ipc: number): number {
    return calcularCanonConIPC(canon, ipc);
  }

  calcularDiasVencimiento(contrato: Contrato): number {
    return calcularDiasVencimiento(contrato);
  }

  estaEnMora(contrato: Contrato, pagos: Pago[]): boolean {
    return estaEnMora(contrato, pagos);
  }

  proximosAVencer(contratos: Contrato[], dias: number): Contrato[] {
    return proximosAVencer(contratos, dias);
  }
}
