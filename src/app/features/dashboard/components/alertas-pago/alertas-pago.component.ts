import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-alertas-pago',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './alertas-pago.component.html',
  styleUrl: './alertas-pago.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertasPagoComponent {
  readonly proximos = input<string[]>([]);
  readonly enMora = input<string[]>([]);
}
