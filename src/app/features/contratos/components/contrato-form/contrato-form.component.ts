import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  computed,
  input,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { toSignal } from '@angular/core/rxjs-interop';
import { TipoContrato, EstadoContrato } from '../../../../core/models/enums';
import { Inmueble } from '../../../../core/models/inmueble.model';
import { formatearMonedaCop } from '../../../../core/utils/currency.util';
import { calcularCanonConIPC } from '../../../../core/utils/ipc.util';
import { NuevoContratoPayload } from '../../services/contratos.service';
import {
  DatosArrendatarioComponent,
  PersonaFormControls,
} from './datos-arrendatario/datos-arrendatario.component';
import { DatosCodeudorComponent } from './datos-codeudor/datos-codeudor.component';
import {
  ContratoWizardControls,
  DatosContratoComponent,
} from './datos-contrato/datos-contrato.component';

@Component({
  selector: 'app-contrato-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
    DatosArrendatarioComponent,
    DatosCodeudorComponent,
    DatosContratoComponent,
  ],
  templateUrl: './contrato-form.component.html',
  styleUrl: './contrato-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContratoFormComponent {
  @Output() readonly guardar = new EventEmitter<NuevoContratoPayload>();
  readonly inmuebles = input<Inmueble[]>([]);

  protected readonly inmuebleForm = new FormGroup<ContratoWizardControls>({
    inmuebleId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    fechaInicio: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    fechaFin: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    canonMensual: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    diaVencimientoPago: new FormControl(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1), Validators.max(31)],
    }),
    medioPago: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    tipoContrato: new FormControl(TipoContrato.DIRECTO, { nonNullable: true }),
    direccionCorrespondencia: new FormControl('', { nonNullable: true }),
    valorDeposito: new FormControl(0, { nonNullable: true }),
    ipcAnual: new FormControl(0, { nonNullable: true }),
  });
  protected readonly arrendatarioForm = this.crearPersonaForm();
  protected readonly codeudorForm = this.crearPersonaForm();
  private readonly contratoValue = toSignal(this.inmuebleForm.valueChanges, {
    initialValue: this.inmuebleForm.getRawValue(),
  });
  protected readonly canonAjustado = computed(() => {
    const values = this.contratoValue();
    return formatearMonedaCop(calcularCanonConIPC(values.canonMensual ?? 0, values.ipcAnual ?? 0));
  });

  protected submit(): void {
    if (this.inmuebleForm.invalid || this.arrendatarioForm.invalid || this.codeudorForm.invalid) {
      this.inmuebleForm.markAllAsTouched();
      this.arrendatarioForm.markAllAsTouched();
      this.codeudorForm.markAllAsTouched();
      return;
    }

    this.guardar.emit({
      arrendatario: this.arrendatarioForm.getRawValue(),
      codeudor: this.codeudorForm.getRawValue(),
      contrato: { ...this.inmuebleForm.getRawValue(), estado: EstadoContrato.ACTIVO },
    });
  }

  private crearPersonaForm(): FormGroup<PersonaFormControls> {
    return new FormGroup<PersonaFormControls>({
      nombres: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      apellidos: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      cedula: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      telefonoCelular: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      telefonoAlternativo: new FormControl('', { nonNullable: true }),
      correo: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      direccionResidencia: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      ciudad: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      empresaTrabajo: new FormControl('', { nonNullable: true }),
      cargo: new FormControl('', { nonNullable: true }),
      telefonoEmpresa: new FormControl('', { nonNullable: true }),
      ingresosMensuales: new FormControl(0, { nonNullable: true }),
    });
  }
}
