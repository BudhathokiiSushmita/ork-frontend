import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumValue',
  standalone: true
})
export class EnumValuePipe implements PipeTransform {

  transform(value: String): String {
    return value.replace("_", " ");
  }
}
