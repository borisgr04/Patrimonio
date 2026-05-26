import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';
import { StorageService, STORAGE_KEYS } from './storage.service';

export type Tema = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly storage = inject(StorageService);
  private readonly temaSignal = signal<Tema>('light');

  readonly tema = this.temaSignal.asReadonly();
  readonly esDark = computed(() => this.temaSignal() === 'dark');

  inicializar(): void {
    const guardado = this.storage.getItem(STORAGE_KEYS.tema);
    const tema =
      guardado.success && (guardado.data === 'dark' || guardado.data === 'light')
        ? guardado.data
        : 'light';
    this.aplicarTema(tema);
  }

  alternar(): void {
    this.aplicarTema(this.temaSignal() === 'dark' ? 'light' : 'dark');
  }

  aplicarTema(tema: Tema): void {
    this.temaSignal.set(tema);
    this.document.documentElement.dataset['theme'] = tema;
    this.storage.setItem(STORAGE_KEYS.tema, tema);
  }
}
