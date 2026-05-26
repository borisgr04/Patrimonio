import { Injectable, inject } from '@angular/core';
import { Contrato } from '../../../core/models/contrato.model';
import { Persona } from '../../../core/models/persona.model';
import { Result } from '../../../core/models/result.model';
import { EstadoContrato } from '../../../core/models/enums';
import { StorageService, STORAGE_KEYS } from '../../../core/services/storage.service';
import { calcularCanonConIPC } from '../../../core/utils/ipc.util';
import { Pago } from '../../../core/models/pago.model';

export interface NuevoContratoPayload {
  arrendatario: Omit<Persona, 'id' | 'createdAt' | 'updatedAt'>;
  codeudor: Omit<Persona, 'id' | 'createdAt' | 'updatedAt'>;
  contrato: Omit<
    Contrato,
    | 'id'
    | 'numeroContrato'
    | 'arrendatarioId'
    | 'codeudorId'
    | 'createdAt'
    | 'updatedAt'
    | 'canonConIPC'
  >;
}

@Injectable({ providedIn: 'root' })
export class ContratosService {
  private readonly storage = inject(StorageService);

  /** Lista contratos creados en localStorage. */
  getAll(): Result<Contrato[]> {
    return this.storage.getAll<Contrato>(STORAGE_KEYS.contratos);
  }

  getById(id: string): Result<Contrato | null> {
    return this.storage.getById<Contrato>(STORAGE_KEYS.contratos, id);
  }

  getPersonas(): Result<Persona[]> {
    return this.storage.getAll<Persona>(STORAGE_KEYS.personas);
  }

  getPersonaById(id: string): Result<Persona | null> {
    return this.storage.getById<Persona>(STORAGE_KEYS.personas, id);
  }

  getPagosByContrato(contratoId: string): Result<Pago[]> {
    const pagos = this.storage.getAll<Pago>(STORAGE_KEYS.pagos);
    if (!pagos.success) {
      return pagos;
    }
    return { success: true, data: pagos.data.filter((pago) => pago.contratoId === contratoId) };
  }

  getByInmueble(inmuebleId: string): Result<Contrato[]> {
    const contratos = this.getAll();
    if (!contratos.success) {
      return contratos;
    }
    return {
      success: true,
      data: contratos.data.filter((contrato) => contrato.inmuebleId === inmuebleId),
    };
  }

  save(payload: NuevoContratoPayload): Result<Contrato> {
    const now = new Date().toISOString();
    const arrendatario: Persona = {
      ...payload.arrendatario,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    const codeudor: Persona = {
      ...payload.codeudor,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    const personas = this.getPersonas();
    if (!personas.success) {
      return { success: false, error: personas.error };
    }

    const contratos = this.getAll();
    if (!contratos.success) {
      return contratos;
    }

    const numeroContrato = this.generarNumeroContrato(contratos.data.length);
    this.storage.setItem(
      STORAGE_KEYS.personas,
      JSON.stringify([...personas.data, arrendatario, codeudor]),
    );

    const contrato: Contrato = {
      ...payload.contrato,
      id: crypto.randomUUID(),
      numeroContrato,
      arrendatarioId: arrendatario.id,
      codeudorId: codeudor.id,
      canonConIPC: payload.contrato.ipcAnual
        ? calcularCanonConIPC(payload.contrato.canonMensual, payload.contrato.ipcAnual)
        : payload.contrato.canonMensual,
      createdAt: now,
      updatedAt: now,
    };

    return this.storage.save(STORAGE_KEYS.contratos, contrato);
  }

  update(id: string, changes: Partial<Contrato>): Result<Contrato> {
    const updatedAt = new Date().toISOString();
    const canonConIPC =
      changes.canonMensual && changes.ipcAnual
        ? calcularCanonConIPC(changes.canonMensual, changes.ipcAnual)
        : changes.canonConIPC;
    return this.storage.update<Contrato>(STORAGE_KEYS.contratos, id, {
      ...changes,
      canonConIPC,
      updatedAt,
    });
  }

  terminar(id: string): Result<Contrato> {
    return this.update(id, { estado: EstadoContrato.TERMINADO });
  }

  private generarNumeroContrato(index: number): string {
    const year = new Date().getFullYear();
    return `CTR-${year}-${String(index + 1).padStart(3, '0')}`;
  }
}
