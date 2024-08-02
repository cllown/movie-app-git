import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { RatingRoundingPipe } from '../../pipes/rating-rounding/rating-rounding.pipe';
import { ClearObservable } from '../../models/clear-observable';
import { takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadMovieDetails } from '../../store/actions';
import { selectSelectedMovie } from '../../store/selectors';

@Component({
  selector: 'app-details-movie-page',
  standalone: true,
  templateUrl: './details-movie-page.component.html',
  styleUrls: ['./details-movie-page.component.scss'],
  imports: [CommonModule, RatingRoundingPipe],
})
export class DetailsMoviePageComponent
  extends ClearObservable
  implements OnInit
{
  movie: Movie | null = null;

  constructor(private route: ActivatedRoute, private store: Store) {
    super();
  }

  ngOnInit() {
    this.store.select(selectSelectedMovie)
      .pipe(takeUntil(this.destroy$))
      .subscribe((movie) => {
        this.movie = movie;
      });
  }
}
