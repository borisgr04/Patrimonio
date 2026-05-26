import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { ContratoCardComponent } from '../../components/contrato-card/contrato-card.component';
import { ContratosStore } from '../../store/contratos.store';
import { ContratosService } from '../../services/contratos.service';
import { InmueblesService } from '../../../inmuebles/services/inmuebles.service';
import { Persona } from '../../../../core/models/persona.model';
import { Inmueble } from '../../../../core/models/inmueble.model';
import { Contrato } from '../../../../core/models/contrato.model';

@Component({
  selector: 'app-contratos-list',
  standalone: true,
  imports: [PageHeaderComponent, EmptyStateComponent, ContratoCardComponent],
  templateUrl: './contratos-list.component.html',
  styleUrl: './contratos-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContratosListComponent {
  protected readonly store = inject(ContratosStore);
  private readonly contratosService = inject(ContratosService);
  private readonly inmueblesService = inject(InmueblesService);
  private readonly personasResult = this.contratosService.getPersonas();
  private readonly inmueblesResult = this.inmueblesService.getAll();
  protected readonly personas: Persona[] = this.personasResult.success
    ? this.personasResult.data
    : [];
  protected readonly inmuebles: Inmueble[] = this.inmueblesResult.success
    ? this.inmueblesResult.data
    : [];

  constructor() {
    this.store.cargar();
  }

  protected nombrePersona(id: string): string {
    const persona = this.personas.find((item: Persona) => item.id === id);
    return persona ? `${persona.nombres} ${persona.apellidos}` : 'Sin arrendatario';
  }

  protected nombreInmueble(id: string): string {
    return this.inmuebles.find((item: Inmueble) => item.id === id)?.alias ?? 'Sin inmueble';
  }
}
