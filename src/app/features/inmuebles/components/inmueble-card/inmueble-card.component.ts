import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Inmueble } from '../../../../core/models/inmueble.model';
import { EstadoInmueble } from '../../../../core/models/enums';
import { CurrencyCopPipe } from '../../../../shared/pipes/currency-cop.pipe';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { InmuebleEstadoBadgeComponent } from '../inmueble-estado-badge/inmueble-estado-badge.component';

@Component({
  selector: 'app-inmueble-card',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CurrencyCopPipe,
    CardComponent,
    InmuebleEstadoBadgeComponent,
  ],
  templateUrl: './inmueble-card.component.html',
  styleUrl: './inmueble-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InmuebleCardComponent {
  readonly inmueble = input<Inmueble | null>(null);
  protected readonly estados = Object.values(EstadoInmueble);
  @Output() readonly cambiarEstado = new EventEmitter<EstadoInmueble>();
}
