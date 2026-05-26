import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { CurrencyCopPipe } from '../../../../shared/pipes/currency-cop.pipe';

@Component({
  selector: 'app-resumen-canon',
  standalone: true,
  imports: [CardComponent, CurrencyCopPipe],
  templateUrl: './resumen-canon.component.html',
  styleUrl: './resumen-canon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumenCanonComponent {
  readonly esperado = input(0);
  readonly recaudado = input(0);
}
