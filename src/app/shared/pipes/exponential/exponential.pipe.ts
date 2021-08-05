import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exponential'
})
export class ExponentialPipe implements PipeTransform {

  transform(value: number): any {
    //That pipe is an example for square a number
    return Math.pow(value, 2);
  }

}
