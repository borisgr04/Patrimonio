import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { EstadoInmueble } from '../../../../core/models/enums';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';

@Component({
  selector: 'app-inmueble-estado-badge',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './inmueble-estado-badge.component.html',
  styleUrl: './inmueble-estado-badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InmuebleEstadoBadgeComponent {
  readonly estado = input<EstadoInmueble>(EstadoInmueble.DISPONIBLE);
  protected readonly label = computed(() => this.estado().replace('_', ' '));
  protected readonly color = computed<'success' | 'warning' | 'danger' | 'neutral'>(() => {
    switch (this.estado()) {
      case EstadoInmueble.DISPONIBLE:
        return 'success';
      case EstadoInmueble.MANTENIMIENTO:
        return 'warning';
      case EstadoInmueble.INHABILITADO:
        return 'danger';
      default:
        return 'neutral';
    }
  });
}
