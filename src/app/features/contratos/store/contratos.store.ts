import { computed, inject, Injectable } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';
import { Contrato } from '../../../core/models/contrato.model';
import { EstadoContrato } from '../../../core/models/enums';
import { IpcService } from '../../../core/services/ipc.service';
import { PagosService } from '../../pagos/services/pagos.service';
import { ContratosService, NuevoContratoPayload } from '../services/contratos.service';

interface ContratosState {
  contratos: Contrato[];
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class ContratosStore {
  private readonly service = inject(ContratosService);
  private readonly ipcService = inject(IpcService);
  private readonly pagosService = inject(PagosService);
  private readonly state = signalState<ContratosState>({
    contratos: [],
    loading: false,
    error: null,
  });

  readonly contratos = this.state.contratos;
  readonly loading = this.state.loading;
  readonly error = this.state.error;
  readonly activos = computed(() =>
    this.state.contratos().filter((item) => item.estado === EstadoContrato.ACTIVO),
  );
  readonly proxAVencer = computed(() =>
    this.ipcService.proximosAVencer(this.state.contratos(), 60),
  );
  readonly conMora = computed(() => {
    const pagos = this.pagosService.getAll();
    const lista = pagos.success ? pagos.data : [];
    return this.state.contratos().filter((contrato) => this.ipcService.estaEnMora(contrato, lista));
  });

  /** Carga contratos del módulo. */
  cargar(): void {
    patchState(this.state, { loading: true, error: null });
    const result = this.service.getAll();
    patchState(
      this.state,
      result.success
        ? { contratos: result.data, loading: false }
        : { loading: false, error: result.error },
    );
  }

  agregar(payload: NuevoContratoPayload): void {
    const result = this.service.save(payload);
    if (!result.success) {
      patchState(this.state, { error: result.error });
      return;
    }
    patchState(this.state, { contratos: [...this.state.contratos(), result.data] });
  }

  actualizar(id: string, changes: Partial<Contrato>): void {
    const result = this.service.update(id, changes);
    if (!result.success) {
      patchState(this.state, { error: result.error });
      return;
    }
    patchState(this.state, {
      contratos: this.state.contratos().map((item) => (item.id === id ? result.data : item)),
    });
  }

  terminar(id: string): void {
    const result = this.service.terminar(id);
    if (!result.success) {
      patchState(this.state, { error: result.error });
      return;
    }
    patchState(this.state, {
      contratos: this.state.contratos().map((item) => (item.id === id ? result.data : item)),
    });
  }
}
