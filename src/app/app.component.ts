import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatToolbarModule,
    ThemeToggleComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly menuAbierto = signal(false);
  protected readonly enlaces = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Inmuebles', href: '/inmuebles' },
    { label: 'Contratos', href: '/contratos' },
    { label: 'Pagos', href: '/pagos' },
    { label: 'Mantenimientos', href: '/mantenimientos' },
  ];

  protected alternarMenu(): void {
    this.menuAbierto.update((valor) => !valor);
  }

  protected cerrarMenu(): void {
    this.menuAbierto.set(false);
  }
}
