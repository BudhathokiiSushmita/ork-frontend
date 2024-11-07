import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enum',
  standalone: true
})
export class EnumPipe implements PipeTransform {

  transform(value: String): String {
    return value.replace(" ", "_").toLocaleUpperCase();
  }
}
