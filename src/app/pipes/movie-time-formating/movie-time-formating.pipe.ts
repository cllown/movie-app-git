import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieTimeFormating',
  standalone: true,
})
export class MovieTimeFormatingPipe implements PipeTransform {
  transform(value: number): string {
    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value % 3600) / 60);
    const seconds: number = value % 60;

    const hoursString = hours.toString().padStart(2, '0');
    const minutesString = minutes.toString().padStart(2, '0');
    const secondsString = seconds.toString().padStart(2, '0');

    return `${hoursString}:${minutesString}:${secondsString}`;
  }
}
