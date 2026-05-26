import { Injectable, inject } from '@angular/core';
import { Mantenimiento } from '../../../core/models/mantenimiento.model';
import { Result } from '../../../core/models/result.model';
import { StorageService, STORAGE_KEYS } from '../../../core/services/storage.service';

@Injectable({ providedIn: 'root' })
export class MantenimientosService {
  private readonly storage = inject(StorageService);

  /** Retorna todos los mantenimientos almacenados. */
  getAll(): Result<Mantenimiento[]> {
    return this.storage.getAll<Mantenimiento>(STORAGE_KEYS.mantenimientos);
  }

  getById(id: string): Result<Mantenimiento | null> {
    return this.storage.getById<Mantenimiento>(STORAGE_KEYS.mantenimientos, id);
  }

  getByInmueble(inmuebleId: string): Result<Mantenimiento[]> {
    const mantenimientos = this.getAll();
    if (!mantenimientos.success) {
      return mantenimientos;
    }
    return {
      success: true,
      data: mantenimientos.data.filter((item) => item.inmuebleId === inmuebleId),
    };
  }

  save(mantenimiento: Mantenimiento): Result<Mantenimiento> {
    return this.storage.save(STORAGE_KEYS.mantenimientos, mantenimiento);
  }

  update(id: string, changes: Partial<Mantenimiento>): Result<Mantenimiento> {
    return this.storage.update<Mantenimiento>(STORAGE_KEYS.mantenimientos, id, {
      ...changes,
      updatedAt: new Date().toISOString(),
    });
  }

  delete(id: string): Result<Mantenimiento[]> {
    return this.storage.delete<Mantenimiento>(STORAGE_KEYS.mantenimientos, id);
  }
}
