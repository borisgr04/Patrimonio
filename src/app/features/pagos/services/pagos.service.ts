import { Injectable, inject } from '@angular/core';
import { Pago } from '../../../core/models/pago.model';
import { Result } from '../../../core/models/result.model';
import { StorageService, STORAGE_KEYS } from '../../../core/services/storage.service';

@Injectable({ providedIn: 'root' })
export class PagosService {
  private readonly storage = inject(StorageService);

  /** Recupera todos los pagos registrados. */
  getAll(): Result<Pago[]> {
    return this.storage.getAll<Pago>(STORAGE_KEYS.pagos);
  }

  getByContrato(contratoId: string): Result<Pago[]> {
    const pagos = this.getAll();
    if (!pagos.success) {
      return pagos;
    }
    return { success: true, data: pagos.data.filter((pago) => pago.contratoId === contratoId) };
  }

  registrar(payload: Omit<Pago, 'id' | 'createdAt' | 'saldoPendiente'>): Result<Pago> {
    const pago: Pago = {
      ...payload,
      id: crypto.randomUUID(),
      saldoPendiente: Math.max(payload.valorEsperado - payload.valorPagado, 0),
      createdAt: new Date().toISOString(),
    };
    return this.storage.save(STORAGE_KEYS.pagos, pago);
  }

  actualizar(id: string, changes: Partial<Pago>): Result<Pago> {
    const saldoPendiente =
      changes.valorEsperado !== undefined || changes.valorPagado !== undefined
        ? Math.max((changes.valorEsperado ?? 0) - (changes.valorPagado ?? 0), 0)
        : changes.saldoPendiente;
    return this.storage.update<Pago>(STORAGE_KEYS.pagos, id, { ...changes, saldoPendiente });
  }
}
