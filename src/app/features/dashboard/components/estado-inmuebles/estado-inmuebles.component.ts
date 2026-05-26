import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-estado-inmuebles',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './estado-inmuebles.component.html',
  styleUrl: './estado-inmuebles.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EstadoInmueblesComponent {
  readonly disponibles = input(0);
  readonly arrendados = input(0);
  readonly mantenimientos = input(0);
}
