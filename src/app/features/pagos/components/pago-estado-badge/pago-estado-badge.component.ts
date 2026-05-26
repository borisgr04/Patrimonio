import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { Pago } from '../../../../core/models/pago.model';

@Component({
  selector: 'app-pago-estado-badge',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './pago-estado-badge.component.html',
  styleUrl: './pago-estado-badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagoEstadoBadgeComponent {
  readonly pago = input<Pago | null>(null);
  protected readonly label = computed(() => {
    const pago = this.pago();
    if (!pago) return 'sin pago';
    if ((pago.saldoPendiente ?? 0) > 0 && pago.valorPagado > 0) return 'parcial';
    if (pago.valorPagado === 0) return 'pendiente';
    return pago.tipoPago;
  });
  protected readonly color = computed<'success' | 'warning' | 'danger'>(() => {
    const pago = this.pago();
    if (!pago) return 'warning';
    if (pago.valorPagado === 0) return 'danger';
    if ((pago.saldoPendiente ?? 0) > 0) return 'warning';
    return 'success';
  });
}
