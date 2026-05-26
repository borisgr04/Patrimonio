import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { EstadoContrato } from '../../../../core/models/enums';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';

@Component({
  selector: 'app-contrato-estado-badge',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './contrato-estado-badge.component.html',
  styleUrl: './contrato-estado-badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContratoEstadoBadgeComponent {
  readonly estado = input<EstadoContrato>(EstadoContrato.ACTIVO);
  protected readonly label = computed(() => this.estado().replace('_', ' '));
  protected readonly color = computed<'success' | 'warning' | 'danger' | 'neutral'>(() => {
    switch (this.estado()) {
      case EstadoContrato.ACTIVO:
        return 'success';
      case EstadoContrato.VENCIDO:
        return 'warning';
      case EstadoContrato.TERMINADO:
        return 'danger';
      default:
        return 'neutral';
    }
  });
}
