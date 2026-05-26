import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PersonaFormControls } from '../datos-arrendatario/datos-arrendatario.component';

@Component({
  selector: 'app-datos-codeudor',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './datos-codeudor.component.html',
  styleUrl: './datos-codeudor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatosCodeudorComponent {
  @Input() form?: FormGroup<PersonaFormControls>;
}
