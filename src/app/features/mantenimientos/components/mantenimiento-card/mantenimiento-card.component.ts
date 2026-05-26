import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { EstadoMantenimiento } from '../../../../core/models/enums';
import { Mantenimiento } from '../../../../core/models/mantenimiento.model';
import { CurrencyCopPipe } from '../../../../shared/pipes/currency-cop.pipe';
import { FechaEsPipe } from '../../../../shared/pipes/fecha-es.pipe';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { MantenimientoEstadoBadgeComponent } from '../mantenimiento-estado-badge/mantenimiento-estado-badge.component';

@Component({
  selector: 'app-mantenimiento-card',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatMenuModule,
    CurrencyCopPipe,
    FechaEsPipe,
    CardComponent,
    MantenimientoEstadoBadgeComponent,
  ],
  templateUrl: './mantenimiento-card.component.html',
  styleUrl: './mantenimiento-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MantenimientoCardComponent {
  readonly mantenimiento = input<Mantenimiento | null>(null);
  readonly inmueble = input('');
  protected readonly estados = Object.values(EstadoMantenimiento);
  @Output() readonly cambiarEstado = new EventEmitter<EstadoMantenimiento>();
}
