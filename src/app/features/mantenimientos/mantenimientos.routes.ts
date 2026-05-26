import { Routes } from '@angular/router';

export const MANTENIMIENTOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/mantenimientos-list/mantenimientos-list.component').then(
        (m) => m.MantenimientosListComponent,
      ),
  },
  {
    path: 'nuevo',
    loadComponent: () =>
      import('./pages/mantenimiento-detail/mantenimiento-detail.component').then(
        (m) => m.MantenimientoDetailComponent,
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/mantenimiento-detail/mantenimiento-detail.component').then(
        (m) => m.MantenimientoDetailComponent,
      ),
  },
];
