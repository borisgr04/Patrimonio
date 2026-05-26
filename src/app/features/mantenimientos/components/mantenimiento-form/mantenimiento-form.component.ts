import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  effect,
  input,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EstadoMantenimiento } from '../../../../core/models/enums';
import { Mantenimiento } from '../../../../core/models/mantenimiento.model';
import { Inmueble } from '../../../../core/models/inmueble.model';

interface MantenimientoFormControls {
  inmuebleId: FormControl<string>;
  fechaMantenimiento: FormControl<string>;
  tipoMantenimiento: FormControl<string>;
  descripcion: FormControl<string>;
  proveedor: FormControl<string>;
  telefonoProveedor: FormControl<string>;
  costoTotal: FormControl<number>;
  estado: FormControl<EstadoMantenimiento>;
}

@Component({
  selector: 'app-mantenimiento-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './mantenimiento-form.component.html',
  styleUrl: './mantenimiento-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MantenimientoFormComponent {
  readonly mantenimiento = input<Mantenimiento | null>(null);
  readonly inmuebles = input<Inmueble[]>([]);
  @Output() readonly guardar = new EventEmitter<
    Omit<Mantenimiento, 'id' | 'createdAt' | 'updatedAt'>
  >();

  protected readonly sugerencias = [
    'eléctrico',
    'plomería',
    'pintura',
    'estructural',
    'jardinería',
    'limpieza',
    'otro',
  ];
  protected readonly estados = Object.values(EstadoMantenimiento);
  protected readonly form = new FormGroup<MantenimientoFormControls>({
    inmuebleId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    fechaMantenimiento: new FormControl(new Date().toISOString().slice(0, 10), {
      nonNullable: true,
      validators: [Validators.required],
    }),
    tipoMantenimiento: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    descripcion: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    proveedor: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    telefonoProveedor: new FormControl('', { nonNullable: true }),
    costoTotal: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    estado: new FormControl(EstadoMantenimiento.PENDIENTE, { nonNullable: true }),
  });

  private readonly sync = effect(() => {
    const value = this.mantenimiento();
    if (!value) return;
    this.form.patchValue({
      inmuebleId: value.inmuebleId,
      fechaMantenimiento: value.fechaMantenimiento,
      tipoMantenimiento: value.tipoMantenimiento,
      descripcion: value.descripcion,
      proveedor: value.proveedor,
      telefonoProveedor: value.telefonoProveedor ?? '',
      costoTotal: value.costoTotal,
      estado: value.estado,
    });
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.guardar.emit(this.form.getRawValue());
  }
}
