import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  readonly data = inject<{ titulo: string; mensaje: string }>(MAT_DIALOG_DATA, {
    optional: true,
  }) ?? {
    titulo: 'Confirmar',
    mensaje: '¿Desea continuar?',
  };
  private readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>, { optional: true });

  protected cerrar(confirmado: boolean): void {
    this.dialogRef?.close(confirmado);
  }
}
