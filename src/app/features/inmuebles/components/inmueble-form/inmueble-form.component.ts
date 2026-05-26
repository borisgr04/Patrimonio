import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Inmueble } from '../../../../core/models/inmueble.model';
import { EstadoInmueble } from '../../../../core/models/enums';

interface InmuebleFormControls {
  alias: FormControl<string>;
  tipoInmueble: FormControl<string>;
  direccion: FormControl<string>;
  ciudad: FormControl<string>;
  municipio: FormControl<string>;
  barrio: FormControl<string>;
  estado: FormControl<EstadoInmueble>;
  valorComercial: FormControl<number>;
  valorCatastral: FormControl<number>;
  fechaAdquisicion: FormControl<string>;
  torre: FormControl<string>;
  piso: FormControl<string>;
  apartamento: FormControl<string>;
}

@Component({
  selector: 'app-inmueble-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './inmueble-form.component.html',
  styleUrl: './inmueble-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InmuebleFormComponent {
  readonly inmueble = input<Inmueble | null>(null);
  @Output() readonly guardar = new EventEmitter<Omit<Inmueble, 'id' | 'createdAt' | 'updatedAt'>>();

  protected readonly tipos = ['Apartamento', 'Casa', 'Local', 'Oficina', 'Bodega'];
  protected readonly estados = Object.values(EstadoInmueble);
  protected readonly form = new FormGroup<InmuebleFormControls>({
    alias: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    tipoInmueble: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    direccion: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    ciudad: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    municipio: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    barrio: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    estado: new FormControl(EstadoInmueble.DISPONIBLE, { nonNullable: true }),
    valorComercial: new FormControl(0, { nonNullable: true }),
    valorCatastral: new FormControl(0, { nonNullable: true }),
    fechaAdquisicion: new FormControl('', { nonNullable: true }),
    torre: new FormControl('', { nonNullable: true }),
    piso: new FormControl('', { nonNullable: true }),
    apartamento: new FormControl('', { nonNullable: true }),
  });
  private readonly sync = effect(() => {
    const item = this.inmueble();
    if (!item) {
      return;
    }
    this.form.patchValue({
      alias: item.alias,
      tipoInmueble: item.tipoInmueble,
      direccion: item.direccion,
      ciudad: item.ciudad,
      municipio: item.municipio,
      barrio: item.barrio,
      estado: item.estado,
      valorComercial: item.valorComercial ?? 0,
      valorCatastral: item.valorCatastral ?? 0,
      fechaAdquisicion: item.fechaAdquisicion ?? '',
      torre: item.torre ?? '',
      piso: item.piso ?? '',
      apartamento: item.apartamento ?? '',
    });
  });

  protected readonly titulo = computed(() =>
    this.inmueble() ? 'Editar inmueble' : 'Nuevo inmueble',
  );

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.guardar.emit(this.form.getRawValue());
  }
}
