import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingRounding',
  standalone: true
})
export class RatingRoundingPipe implements PipeTransform {

  transform(value: number): string {
    return value.toFixed(1);
  }

}
