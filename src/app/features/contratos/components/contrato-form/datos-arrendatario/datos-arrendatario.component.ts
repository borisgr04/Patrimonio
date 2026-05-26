import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface PersonaFormControls {
  nombres: FormControl<string>;
  apellidos: FormControl<string>;
  cedula: FormControl<string>;
  telefonoCelular: FormControl<string>;
  telefonoAlternativo: FormControl<string>;
  correo: FormControl<string>;
  direccionResidencia: FormControl<string>;
  ciudad: FormControl<string>;
  empresaTrabajo: FormControl<string>;
  cargo: FormControl<string>;
  telefonoEmpresa: FormControl<string>;
  ingresosMensuales: FormControl<number>;
}

@Component({
  selector: 'app-datos-arrendatario',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './datos-arrendatario.component.html',
  styleUrl: './datos-arrendatario.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatosArrendatarioComponent {
  @Input() form?: FormGroup<PersonaFormControls>;
}
