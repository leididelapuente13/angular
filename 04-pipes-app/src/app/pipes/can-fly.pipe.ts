import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'canFly',
})
export class CanFlyPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Hero can fly' : 'Hero cannot fly';
  }

}
