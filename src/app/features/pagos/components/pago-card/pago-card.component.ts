import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Pago } from '../../../../core/models/pago.model';
import { CurrencyCopPipe } from '../../../../shared/pipes/currency-cop.pipe';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { PagoEstadoBadgeComponent } from '../pago-estado-badge/pago-estado-badge.component';
import { WhatsappButtonComponent } from '../whatsapp-button/whatsapp-button.component';

@Component({
  selector: 'app-pago-card',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    CurrencyCopPipe,
    CardComponent,
    PagoEstadoBadgeComponent,
    WhatsappButtonComponent,
  ],
  templateUrl: './pago-card.component.html',
  styleUrl: './pago-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagoCardComponent {
  readonly pago = input<Pago | null>(null);
  readonly inmueble = input('');
  readonly arrendatario = input('');
  readonly whatsappLink = input('');
  protected readonly diasMora = computed(() => {
    const pago = this.pago();
    if (!pago || (pago.valorPagado > 0 && (pago.saldoPendiente ?? 0) === 0)) return 0;
    const fecha = new Date(`${pago.fechaPago}T00:00:00`);
    return Math.max(0, Math.floor((Date.now() - fecha.getTime()) / 86_400_000));
  });
}
