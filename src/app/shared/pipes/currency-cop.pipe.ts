import { Pipe, PipeTransform } from '@angular/core';
import { formatearMonedaCop } from '../../core/utils/currency.util';

@Pipe({
  name: 'currencyCop',
  standalone: true,
})
export class CurrencyCopPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    return formatearMonedaCop(value);
  }
}
