import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDateFormat',
  standalone: true
})
export class CustomDateFormatPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}
  transform(value: Date | string | null, format: string = 'dd/MM/yyyy'): string | null {
    return value ? this.datePipe.transform(value, format) : null;
  }

}
