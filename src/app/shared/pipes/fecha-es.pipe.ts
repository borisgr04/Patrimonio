import { Pipe, PipeTransform } from '@angular/core';
import { formatearFechaColombia } from '../../core/utils/date.util';

@Pipe({
  name: 'fechaEs',
  standalone: true,
})
export class FechaEsPipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {
    return formatearFechaColombia(value);
  }
}
