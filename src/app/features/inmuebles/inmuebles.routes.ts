import { Routes } from '@angular/router';

export const INMUEBLES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/inmuebles-list/inmuebles-list.component').then(
        (m) => m.InmueblesListComponent,
      ),
  },
  {
    path: 'nuevo',
    loadComponent: () =>
      import('./pages/inmueble-detail/inmueble-detail.component').then(
        (m) => m.InmuebleDetailComponent,
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/inmueble-detail/inmueble-detail.component').then(
        (m) => m.InmuebleDetailComponent,
      ),
  },
  {
    path: ':id/editar',
    loadComponent: () =>
      import('./pages/inmueble-detail/inmueble-detail.component').then(
        (m) => m.InmuebleDetailComponent,
      ),
  },
];
