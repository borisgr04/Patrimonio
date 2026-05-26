import {
  ChangeDetectionStrategy,
  Component,
  EffectRef,
  EventEmitter,
  Output,
  computed,
  effect,
  input,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Contrato } from '../../../../core/models/contrato.model';
import { MetodoPago, TipoPago } from '../../../../core/models/enums';
import { formatearMonedaCop } from '../../../../core/utils/currency.util';

interface PagoFormControls {
  contratoId: FormControl<string>;
  mesCorresponde: FormControl<string>;
  fechaPago: FormControl<string>;
  valorEsperado: FormControl<number>;
  valorPagado: FormControl<number>;
  tipoPago: FormControl<TipoPago>;
  metodoPago: FormControl<MetodoPago>;
  numeroComprobante: FormControl<string>;
  nota: FormControl<string>;
}

@Component({
  selector: 'app-pago-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './pago-form.component.html',
  styleUrl: './pago-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagoFormComponent {
  readonly contratos = input<Contrato[]>([]);
  readonly contratoId = input('');
  @Output() readonly guardar = new EventEmitter<{
    contratoId: string;
    mesCorresponde: string;
    fechaPago: string;
    valorEsperado: number;
    valorPagado: number;
    tipoPago: TipoPago;
    metodoPago: MetodoPago;
    numeroComprobante?: string;
    nota?: string;
    notificacionEnviada: boolean;
  }>();

  protected readonly tipos = Object.values(TipoPago);
  protected readonly metodos = Object.values(MetodoPago);
  protected readonly form = new FormGroup<PagoFormControls>({
    contratoId: new FormControl(this.contratoId() || '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    mesCorresponde: new FormControl(new Date().toISOString().slice(0, 7), {
      nonNullable: true,
      validators: [Validators.required],
    }),
    fechaPago: new FormControl(new Date().toISOString().slice(0, 10), {
      nonNullable: true,
      validators: [Validators.required],
    }),
    valorEsperado: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    valorPagado: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    tipoPago: new FormControl(TipoPago.COMPLETO, { nonNullable: true }),
    metodoPago: new FormControl(MetodoPago.TRANSFERENCIA, { nonNullable: true }),
    numeroComprobante: new FormControl('', { nonNullable: true }),
    nota: new FormControl('', { nonNullable: true }),
  });
  private readonly syncContratoId: EffectRef = effect(() => {
    const contratoId = this.contratoId();
    if (contratoId) {
      this.form.controls.contratoId.setValue(contratoId);
    }
  });
  private readonly value = toSignal(this.form.valueChanges, {
    initialValue: this.form.getRawValue(),
  });
  protected readonly saldoPendiente = computed(() => {
    const value = this.value() ?? this.form.getRawValue();
    return Math.max((value.valorEsperado ?? 0) - (value.valorPagado ?? 0), 0);
  });
  protected readonly saldoPendienteTexto = computed(() =>
    formatearMonedaCop(this.saldoPendiente()),
  );

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.guardar.emit({ ...this.form.getRawValue(), notificacionEnviada: false });
  }
}
