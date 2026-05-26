import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { EstadoMantenimiento } from '../../../../core/models/enums';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';

@Component({
  selector: 'app-mantenimiento-estado-badge',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './mantenimiento-estado-badge.component.html',
  styleUrl: './mantenimiento-estado-badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MantenimientoEstadoBadgeComponent {
  readonly estado = input<EstadoMantenimiento>(EstadoMantenimiento.PENDIENTE);
  protected readonly label = computed(() => this.estado().replace('_', ' '));
  protected readonly color = computed<'success' | 'warning' | 'danger'>(() => {
    switch (this.estado()) {
      case EstadoMantenimiento.TERMINADO:
        return 'success';
      case EstadoMantenimiento.EN_PROCESO:
        return 'warning';
      default:
        return 'danger';
    }
  });
}
