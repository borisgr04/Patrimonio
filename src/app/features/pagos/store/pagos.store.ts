import { computed, inject, Injectable } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';
import { Pago } from '../../../core/models/pago.model';
import { obtenerMesActual } from '../../../core/utils/date.util';
import { PagosService } from '../services/pagos.service';

interface PagosState {
  pagos: Pago[];
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class PagosStore {
  private readonly service = inject(PagosService);
  private readonly state = signalState<PagosState>({ pagos: [], loading: false, error: null });

  readonly pagos = this.state.pagos;
  readonly loading = this.state.loading;
  readonly error = this.state.error;
  readonly pagosMes = computed(() =>
    this.state.pagos().filter((pago) => pago.mesCorresponde === obtenerMesActual()),
  );
  readonly pendientesMes = computed(() =>
    this.pagosMes().filter((pago) => (pago.saldoPendiente ?? 0) > 0),
  );
  readonly totalRecaudado = computed(() =>
    this.pagosMes().reduce((acc, pago) => acc + pago.valorPagado, 0),
  );

  /** Carga pagos del mes y del histórico. */
  cargar(): void {
    patchState(this.state, { loading: true, error: null });
    const result = this.service.getAll();
    patchState(
      this.state,
      result.success
        ? { pagos: result.data, loading: false }
        : { loading: false, error: result.error },
    );
  }

  registrar(payload: Omit<Pago, 'id' | 'createdAt' | 'saldoPendiente'>): void {
    const result = this.service.registrar(payload);
    if (!result.success) {
      patchState(this.state, { error: result.error });
      return;
    }
    patchState(this.state, { pagos: [...this.state.pagos(), result.data] });
  }

  actualizar(id: string, changes: Partial<Pago>): void {
    const result = this.service.actualizar(id, changes);
    if (!result.success) {
      patchState(this.state, { error: result.error });
      return;
    }
    patchState(this.state, {
      pagos: this.state.pagos().map((item) => (item.id === id ? result.data : item)),
    });
  }
}
