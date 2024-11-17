import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean',
  standalone: true
})
export class BooleanPipe implements PipeTransform {

  transform(value: Boolean): String {
    return value ? 'Yes' : 'No';
  }
}
