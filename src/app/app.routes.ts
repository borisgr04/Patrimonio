import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  },
  {
    path: 'inmuebles',
    loadChildren: () =>
      import('./features/inmuebles/inmuebles.routes').then((m) => m.INMUEBLES_ROUTES),
  },
  {
    path: 'contratos',
    loadChildren: () =>
      import('./features/contratos/contratos.routes').then((m) => m.CONTRATOS_ROUTES),
  },
  {
    path: 'pagos',
    loadChildren: () => import('./features/pagos/pagos.routes').then((m) => m.PAGOS_ROUTES),
  },
  {
    path: 'mantenimientos',
    loadChildren: () =>
      import('./features/mantenimientos/mantenimientos.routes').then(
        (m) => m.MANTENIMIENTOS_ROUTES,
      ),
  },
  { path: '**', redirectTo: 'dashboard' },
];
