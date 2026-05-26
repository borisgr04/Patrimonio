import { Routes } from '@angular/router';

export const PAGOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/pagos-list/pagos-list.component').then((m) => m.PagosListComponent),
  },
  {
    path: 'nuevo/:contratoId',
    loadComponent: () =>
      import('./pages/registro-pago/registro-pago.component').then((m) => m.RegistroPagoComponent),
  },
];
