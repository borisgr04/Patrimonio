import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Inmueble } from '../../../../core/models/inmueble.model';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { FechaEsPipe } from '../../../../shared/pipes/fecha-es.pipe';
import { CurrencyCopPipe } from '../../../../shared/pipes/currency-cop.pipe';
import { InmuebleFormComponent } from '../../components/inmueble-form/inmueble-form.component';
import { InmueblesService } from '../../services/inmuebles.service';
import { ContratosService } from '../../../contratos/services/contratos.service';
import { MantenimientosService } from '../../../mantenimientos/services/mantenimientos.service';
import { EstadoInmueble } from '../../../../core/models/enums';
import { Contrato } from '../../../../core/models/contrato.model';
import { Mantenimiento } from '../../../../core/models/mantenimiento.model';

@Component({
  selector: 'app-inmueble-detail',
  standalone: true,
  imports: [
    MatButtonModule,
    PageHeaderComponent,
    CardComponent,
    FechaEsPipe,
    CurrencyCopPipe,
    InmuebleFormComponent,
  ],
  templateUrl: './inmueble-detail.component.html',
  styleUrl: './inmueble-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InmuebleDetailComponent {
  readonly id = input<string>();
  private readonly service = inject(InmueblesService);
  private readonly contratosService = inject(ContratosService);
  private readonly mantenimientosService = inject(MantenimientosService);
  private readonly router = inject(Router, { optional: true });
  private readonly contratosResult = this.contratosService.getAll();
  private readonly mantenimientosResult = this.mantenimientosService.getAll();
  protected readonly inmueble = signal<Inmueble | null>(null);
  protected readonly contratos = signal<Contrato[]>(
    this.contratosResult.success ? this.contratosResult.data : [],
  );
  protected readonly mantenimientos = signal<Mantenimiento[]>(
    this.mantenimientosResult.success ? this.mantenimientosResult.data : [],
  );
  protected readonly esNuevo = computed(() => !this.id());

  constructor() {
    effect(() => {
      const id = this.id();
      if (!id) {
        this.inmueble.set(null);
        return;
      }
      const result = this.service.getById(id);
      if (result.success) {
        this.inmueble.set(result.data);
      }
    });
  }

  protected guardar(payload: Omit<Inmueble, 'id' | 'createdAt' | 'updatedAt'>): void {
    if (this.id() && this.inmueble()) {
      this.service.update(this.id()!, { ...payload, updatedAt: new Date().toISOString() });
    } else {
      const now = new Date().toISOString();
      const created: Inmueble = {
        ...payload,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
        estado: payload.estado ?? EstadoInmueble.DISPONIBLE,
      };
      this.service.save(created);
    }
    this.router?.navigateByUrl('/inmuebles');
  }

  protected readonly contratosRelacionados = computed(() =>
    this.contratos().filter((item) => item.inmuebleId === this.id()),
  );
  protected readonly mantenimientosRelacionados = computed(() =>
    this.mantenimientos().filter((item) => item.inmuebleId === this.id()),
  );
}
