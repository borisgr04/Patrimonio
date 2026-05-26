import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InmueblesService } from '../../../inmuebles/services/inmuebles.service';
import { MantenimientosStore } from '../../store/mantenimientos.store';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { MantenimientoCardComponent } from '../../components/mantenimiento-card/mantenimiento-card.component';
import { EstadoMantenimiento } from '../../../../core/models/enums';
import { Inmueble } from '../../../../core/models/inmueble.model';

@Component({
  selector: 'app-mantenimientos-list',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    PageHeaderComponent,
    EmptyStateComponent,
    MantenimientoCardComponent,
  ],
  templateUrl: './mantenimientos-list.component.html',
  styleUrl: './mantenimientos-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MantenimientosListComponent {
  protected readonly store = inject(MantenimientosStore);
  private readonly inmueblesService = inject(InmueblesService);
  private readonly inmueblesResult = this.inmueblesService.getAll();
  protected readonly filtro = signal('');
  protected readonly inmuebles: Inmueble[] = this.inmueblesResult.success
    ? this.inmueblesResult.data
    : [];

  constructor() {
    this.store.cargar();
  }

  protected nombreInmueble(id: string): string {
    return this.inmuebles.find((item: Inmueble) => item.id === id)?.alias ?? 'Sin inmueble';
  }

  protected actualizarEstado(id: string, estado: EstadoMantenimiento): void {
    this.store.actualizar(id, { estado });
  }

  protected listaFiltrada() {
    const filtro = this.filtro().toLowerCase();
    return this.store.mantenimientos().filter((item) => {
      const nombre = this.nombreInmueble(item.inmuebleId).toLowerCase();
      return [nombre, item.tipoMantenimiento.toLowerCase(), item.estado].some((valor) =>
        valor.includes(filtro),
      );
    });
  }
}
