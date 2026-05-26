import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TipoContrato } from '../../../../../core/models/enums';
import { Inmueble } from '../../../../../core/models/inmueble.model';

export interface ContratoWizardControls {
  inmuebleId: FormControl<string>;
  fechaInicio: FormControl<string>;
  fechaFin: FormControl<string>;
  canonMensual: FormControl<number>;
  diaVencimientoPago: FormControl<number>;
  medioPago: FormControl<string>;
  tipoContrato: FormControl<TipoContrato>;
  direccionCorrespondencia: FormControl<string>;
  valorDeposito: FormControl<number>;
  ipcAnual: FormControl<number>;
}

@Component({
  selector: 'app-datos-contrato',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './datos-contrato.component.html',
  styleUrl: './datos-contrato.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatosContratoComponent {
  @Input() form?: FormGroup<ContratoWizardControls>;
  @Input() inmuebles: Inmueble[] = [];
  readonly tipos = Object.values(TipoContrato);
}
