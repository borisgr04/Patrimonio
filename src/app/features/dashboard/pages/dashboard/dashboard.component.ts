import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ContratosStore } from '../../../contratos/store/contratos.store';
import { InmueblesStore } from '../../../inmuebles/store/inmuebles.store';
import { MantenimientosStore } from '../../../mantenimientos/store/mantenimientos.store';
import { PagosStore } from '../../../pagos/store/pagos.store';
import { ResumenCanonComponent } from '../../components/resumen-canon/resumen-canon.component';
import { AlertasPagoComponent } from '../../components/alertas-pago/alertas-pago.component';
import { EstadoInmueblesComponent } from '../../components/estado-inmuebles/estado-inmuebles.component';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    ResumenCanonComponent,
    AlertasPagoComponent,
    EstadoInmueblesComponent,
    CardComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  protected readonly inmueblesStore = inject(InmueblesStore);
  protected readonly contratosStore = inject(ContratosStore);
  protected readonly pagosStore = inject(PagosStore);
  protected readonly mantenimientosStore = inject(MantenimientosStore);
  protected readonly canonEsperado = computed(() =>
    this.contratosStore.activos().reduce((acc, contrato) => acc + contrato.canonMensual, 0),
  );
  protected readonly proximos = computed(() =>
    this.contratosStore.proxAVencer().map((item) => `${item.numeroContrato} vence pronto`),
  );
  protected readonly mora = computed(() =>
    this.contratosStore.conMora().map((item) => `${item.numeroContrato} presenta mora`),
  );

  constructor() {
    this.inmueblesStore.cargar();
    this.contratosStore.cargar();
    this.pagosStore.cargar();
    this.mantenimientosStore.cargar();
  }
}
