import { Routes } from '@angular/router';

export const CONTRATOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/contratos-list/contratos-list.component').then(
        (m) => m.ContratosListComponent,
      ),
  },
  {
    path: 'nuevo',
    loadComponent: () =>
      import('./pages/contrato-detail/contrato-detail.component').then(
        (m) => m.ContratoDetailComponent,
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/contrato-detail/contrato-detail.component').then(
        (m) => m.ContratoDetailComponent,
      ),
  },
];
