import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Contrato } from '../../../../core/models/contrato.model';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { CurrencyCopPipe } from '../../../../shared/pipes/currency-cop.pipe';
import { FechaEsPipe } from '../../../../shared/pipes/fecha-es.pipe';
import { ContratoEstadoBadgeComponent } from '../contrato-estado-badge/contrato-estado-badge.component';

@Component({
  selector: 'app-contrato-card',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    CardComponent,
    CurrencyCopPipe,
    FechaEsPipe,
    ContratoEstadoBadgeComponent,
  ],
  templateUrl: './contrato-card.component.html',
  styleUrl: './contrato-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContratoCardComponent {
  readonly contrato = input<Contrato | null>(null);
  readonly inmueble = input('');
  readonly arrendatario = input('');
  protected readonly vencePronto = computed(() => {
    const contrato = this.contrato();
    if (!contrato) {
      return false;
    }
    const fechaFin = new Date(`${contrato.fechaFin}T00:00:00`);
    const hoy = new Date();
    return Math.ceil((fechaFin.getTime() - hoy.getTime()) / 86_400_000) <= 60;
  });
}
