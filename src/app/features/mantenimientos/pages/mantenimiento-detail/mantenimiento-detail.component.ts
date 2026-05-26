import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { CurrencyCopPipe } from '../../../../shared/pipes/currency-cop.pipe';
import { FechaEsPipe } from '../../../../shared/pipes/fecha-es.pipe';
import { Mantenimiento } from '../../../../core/models/mantenimiento.model';
import { InmueblesService } from '../../../inmuebles/services/inmuebles.service';
import { MantenimientosService } from '../../services/mantenimientos.service';
import { MantenimientoFormComponent } from '../../components/mantenimiento-form/mantenimiento-form.component';
import { Inmueble } from '../../../../core/models/inmueble.model';

@Component({
  selector: 'app-mantenimiento-detail',
  standalone: true,
  imports: [
    PageHeaderComponent,
    CardComponent,
    CurrencyCopPipe,
    FechaEsPipe,
    MantenimientoFormComponent,
  ],
  templateUrl: './mantenimiento-detail.component.html',
  styleUrl: './mantenimiento-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MantenimientoDetailComponent {
  readonly id = input<string>();
  private readonly service = inject(MantenimientosService);
  private readonly inmueblesService = inject(InmueblesService);
  private readonly router = inject(Router, { optional: true });
  private readonly inmueblesResult = this.inmueblesService.getAll();
  protected readonly mantenimiento = signal<Mantenimiento | null>(null);
  protected readonly inmuebles: Inmueble[] = this.inmueblesResult.success
    ? this.inmueblesResult.data
    : [];

  constructor() {
    effect(() => {
      const id = this.id();
      if (!id) {
        this.mantenimiento.set(null);
        return;
      }
      const result = this.service.getById(id);
      if (result.success) {
        this.mantenimiento.set(result.data);
      }
    });
  }

  protected guardar(payload: Omit<Mantenimiento, 'id' | 'createdAt' | 'updatedAt'>): void {
    if (this.id()) {
      this.service.update(this.id()!, payload);
    } else {
      const now = new Date().toISOString();
      this.service.save({ ...payload, id: crypto.randomUUID(), createdAt: now, updatedAt: now });
    }
    this.router?.navigateByUrl('/mantenimientos');
  }

  protected nombreInmueble(id: string): string {
    return this.inmuebles.find((item: Inmueble) => item.id === id)?.alias ?? 'Sin inmueble';
  }
}
