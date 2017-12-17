import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
        name : 'runtime',
      })
export class RuntimePipe implements PipeTransform {

  transform(value: string, ...args) {
    let runtime = Number.parseInt(value);
    let hours   = Number.parseInt('' + runtime / 60);
    let minutes = runtime - hours * 60;

    return `${hours}h${minutes}m`
  }
}
