import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Contrato } from '../../../../core/models/contrato.model';
import { Pago } from '../../../../core/models/pago.model';
import { Persona } from '../../../../core/models/persona.model';
import { Inmueble } from '../../../../core/models/inmueble.model';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { CurrencyCopPipe } from '../../../../shared/pipes/currency-cop.pipe';
import { FechaEsPipe } from '../../../../shared/pipes/fecha-es.pipe';
import { ContratoFormComponent } from '../../components/contrato-form/contrato-form.component';
import { ContratosService, NuevoContratoPayload } from '../../services/contratos.service';
import { InmueblesService } from '../../../inmuebles/services/inmuebles.service';

@Component({
  selector: 'app-contrato-detail',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    PageHeaderComponent,
    CardComponent,
    CurrencyCopPipe,
    FechaEsPipe,
    ContratoFormComponent,
  ],
  templateUrl: './contrato-detail.component.html',
  styleUrl: './contrato-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContratoDetailComponent {
  readonly id = input<string>();
  private readonly service = inject(ContratosService);
  private readonly inmueblesService = inject(InmueblesService);
  private readonly router = inject(Router, { optional: true });
  private readonly personasResult = this.service.getPersonas();
  private readonly inmueblesResult = this.inmueblesService.getAll();
  protected readonly contrato = signal<Contrato | null>(null);
  protected readonly personas = signal<Persona[]>(
    this.personasResult.success ? this.personasResult.data : [],
  );
  protected readonly pagos = signal<Pago[]>([]);
  protected readonly inmuebles: Inmueble[] = this.inmueblesResult.success
    ? this.inmueblesResult.data
    : [];

  constructor() {
    effect(() => {
      const id = this.id();
      if (!id) {
        this.contrato.set(null);
        this.pagos.set([]);
        return;
      }
      const contratoResult = this.service.getById(id);
      if (contratoResult.success) {
        this.contrato.set(contratoResult.data);
      }
      const pagosResult = this.service.getPagosByContrato(id);
      if (pagosResult.success) {
        this.pagos.set(pagosResult.data);
      }
    });
  }

  protected guardar(payload: NuevoContratoPayload): void {
    const result = this.service.save(payload);
    if (result.success) {
      this.router?.navigateByUrl(`/contratos/${result.data.id}`);
    }
  }

  protected nombrePersona(id: string | undefined): string {
    if (!id) return 'Sin persona';
    const persona = this.personas().find((item: Persona) => item.id === id);
    return persona ? `${persona.nombres} ${persona.apellidos}` : 'Sin persona';
  }
}
