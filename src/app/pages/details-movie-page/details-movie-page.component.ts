import { selectIsLoggedIn, selectLoading } from './../../store/selectors';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { RatingRoundingPipe } from '../../pipes/rating-rounding/rating-rounding.pipe';
import { Observable, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectSelectedMovie } from '../../store/selectors';
import { ButtonModule } from 'primeng/button';
import * as MovieActions from '../../store/actions';

@Component({
  selector: 'app-details-movie-page',
  standalone: true,
  templateUrl: './details-movie-page.component.html',
  styleUrls: ['./details-movie-page.component.scss'],
  imports: [CommonModule, RatingRoundingPipe, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsMoviePageComponent implements OnInit {
  movie$!: Observable<Movie | null>;
  isLoggedIn$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.movie$ = this.store.select(selectSelectedMovie);
  }
  onWatch(movieId: number) {
    this.isLoggedIn$
      .pipe(
        take(1),
        tap((isLoggedIn) => {
          if (isLoggedIn) {
            if (!isLoggedIn) {
            } else {
              this.openSubscriptionPopup();
            }
          } else {
            this.openLoginPopup();
          }
        })
      )
      .subscribe();
  }
  private openLoginPopup() {
    this.store.dispatch(MovieActions.openLoginPopup());
  }
  private openSubscriptionPopup() {
    this.store.dispatch(MovieActions.openSubscriptionPopup());
  }
}
