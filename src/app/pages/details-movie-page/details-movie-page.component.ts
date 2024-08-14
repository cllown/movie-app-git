import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { RatingRoundingPipe } from '../../pipes/rating-rounding/rating-rounding.pipe';
import { Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import { selectSelectedMovie } from '../../store/selectors';

@Component({
  selector: 'app-details-movie-page',
  standalone: true,
  templateUrl: './details-movie-page.component.html',
  styleUrls: ['./details-movie-page.component.scss'],
  imports: [CommonModule, RatingRoundingPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsMoviePageComponent implements OnInit {
  movie$!: Observable<Movie | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.movie$ = this.store.select(selectSelectedMovie);
  }
}
