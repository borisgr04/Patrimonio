import { computed, inject, Injectable } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';
import { EstadoMantenimiento } from '../../../core/models/enums';
import { Mantenimiento } from '../../../core/models/mantenimiento.model';
import { MantenimientosService } from '../services/mantenimientos.service';

interface MantenimientosState {
  mantenimientos: Mantenimiento[];
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class MantenimientosStore {
  private readonly service = inject(MantenimientosService);
  private readonly state = signalState<MantenimientosState>({
    mantenimientos: [],
    loading: false,
    error: null,
  });

  readonly mantenimientos = this.state.mantenimientos;
  readonly loading = this.state.loading;
  readonly error = this.state.error;
  readonly pendientes = computed(() =>
    this.state.mantenimientos().filter((item) => item.estado === EstadoMantenimiento.PENDIENTE),
  );
  readonly enProceso = computed(() =>
    this.state.mantenimientos().filter((item) => item.estado === EstadoMantenimiento.EN_PROCESO),
  );
  readonly terminados = computed(() =>
    this.state.mantenimientos().filter((item) => item.estado === EstadoMantenimiento.TERMINADO),
  );
  readonly costoTotal = computed(() =>
    this.state.mantenimientos().reduce((acc, item) => acc + item.costoTotal, 0),
  );

  /** Carga mantenimientos del módulo. */
  cargar(): void {
    patchState(this.state, { loading: true, error: null });
    const result = this.service.getAll();
    patchState(
      this.state,
      result.success
        ? { mantenimientos: result.data, loading: false }
        : { loading: false, error: result.error },
    );
  }

  agregar(mantenimiento: Mantenimiento): void {
    const result = this.service.save(mantenimiento);
    if (!result.success) {
      patchState(this.state, { error: result.error });
      return;
    }
    patchState(this.state, { mantenimientos: [...this.state.mantenimientos(), result.data] });
  }

  actualizar(id: string, changes: Partial<Mantenimiento>): void {
    const result = this.service.update(id, changes);
    if (!result.success) {
      patchState(this.state, { error: result.error });
      return;
    }
    patchState(this.state, {
      mantenimientos: this.state
        .mantenimientos()
        .map((item) => (item.id === id ? result.data : item)),
    });
  }

  eliminar(id: string): void {
    const result = this.service.delete(id);
    patchState(
      this.state,
      result.success ? { mantenimientos: result.data } : { error: result.error },
    );
  }
}
