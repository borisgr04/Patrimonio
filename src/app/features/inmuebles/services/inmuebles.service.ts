import { Injectable, inject } from '@angular/core';
import { Inmueble } from '../../../core/models/inmueble.model';
import { Result } from '../../../core/models/result.model';
import { StorageService, STORAGE_KEYS } from '../../../core/services/storage.service';

@Injectable({ providedIn: 'root' })
export class InmueblesService {
  private readonly storage = inject(StorageService);

  /** Lista todos los inmuebles persistidos. */
  getAll(): Result<Inmueble[]> {
    return this.storage.getAll<Inmueble>(STORAGE_KEYS.inmuebles);
  }

  getById(id: string): Result<Inmueble | null> {
    return this.storage.getById<Inmueble>(STORAGE_KEYS.inmuebles, id);
  }

  save(inmueble: Inmueble): Result<Inmueble> {
    return this.storage.save(STORAGE_KEYS.inmuebles, inmueble);
  }

  update(id: string, changes: Partial<Inmueble>): Result<Inmueble> {
    return this.storage.update<Inmueble>(STORAGE_KEYS.inmuebles, id, changes);
  }

  delete(id: string): Result<Inmueble[]> {
    return this.storage.delete<Inmueble>(STORAGE_KEYS.inmuebles, id);
  }
}
