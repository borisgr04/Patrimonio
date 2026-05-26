import { computed, inject, Injectable } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';
import { Inmueble } from '../../../core/models/inmueble.model';
import { EstadoInmueble } from '../../../core/models/enums';
import { InmueblesService } from '../services/inmuebles.service';

interface InmueblesState {
  inmuebles: Inmueble[];
  loading: boolean;
  error: string | null;
  filtro: string;
}

@Injectable({ providedIn: 'root' })
export class InmueblesStore {
  private readonly service = inject(InmueblesService);
  private readonly state = signalState<InmueblesState>({
    inmuebles: [],
    loading: false,
    error: null,
    filtro: '',
  });

  readonly inmuebles = this.state.inmuebles;
  readonly loading = this.state.loading;
  readonly error = this.state.error;
  readonly filtro = this.state.filtro;
  readonly arrendados = computed(() =>
    this.state.inmuebles().filter((item) => item.estado === EstadoInmueble.ARRENDADO),
  );
  readonly disponibles = computed(() =>
    this.state.inmuebles().filter((item) => item.estado === EstadoInmueble.DISPONIBLE),
  );
  readonly enMantenimiento = computed(() =>
    this.state.inmuebles().filter((item) => item.estado === EstadoInmueble.MANTENIMIENTO),
  );
  readonly filtrados = computed(() => {
    const filtro = this.state.filtro().trim().toLowerCase();
    if (!filtro) {
      return this.state.inmuebles();
    }
    return this.state
      .inmuebles()
      .filter((item) =>
        [item.alias, item.tipoInmueble, item.estado, item.ciudad].some((value) =>
          value.toLowerCase().includes(filtro),
        ),
      );
  });

  /** Carga inmuebles desde el servicio persistente. */
  cargar(): void {
    patchState(this.state, { loading: true, error: null });
    const result = this.service.getAll();
    patchState(
      this.state,
      result.success
        ? { inmuebles: result.data, loading: false }
        : { loading: false, error: result.error },
    );
  }

  agregar(inmueble: Inmueble): void {
    const result = this.service.save(inmueble);
    if (!result.success) {
      patchState(this.state, { error: result.error });
      return;
    }
    patchState(this.state, { inmuebles: [...this.state.inmuebles(), result.data] });
  }

  actualizar(id: string, changes: Partial<Inmueble>): void {
    const result = this.service.update(id, changes);
    if (!result.success) {
      patchState(this.state, { error: result.error });
      return;
    }
    patchState(this.state, {
      inmuebles: this.state.inmuebles().map((item) => (item.id === id ? result.data : item)),
    });
  }

  eliminar(id: string): void {
    const result = this.service.delete(id);
    patchState(this.state, result.success ? { inmuebles: result.data } : { error: result.error });
  }

  filtrar(filtro: string): void {
    patchState(this.state, { filtro });
  }
}
