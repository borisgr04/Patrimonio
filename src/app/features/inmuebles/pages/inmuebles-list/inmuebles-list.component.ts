import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { InmuebleCardComponent } from '../../components/inmueble-card/inmueble-card.component';
import { InmueblesStore } from '../../store/inmuebles.store';
import { EstadoInmueble } from '../../../../core/models/enums';

@Component({
  selector: 'app-inmuebles-list',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    PageHeaderComponent,
    EmptyStateComponent,
    InmuebleCardComponent,
  ],
  templateUrl: './inmuebles-list.component.html',
  styleUrl: './inmuebles-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InmueblesListComponent {
  protected readonly store = inject(InmueblesStore);

  constructor() {
    this.store.cargar();
  }

  protected actualizarEstado(id: string, estado: EstadoInmueble): void {
    this.store.actualizar(id, { estado, updatedAt: new Date().toISOString() });
  }
}
