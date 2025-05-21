import {
  selectIsLoggedIn,
  selectIsSubscribed,
  selectLoading,
} from './../../store/selectors';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { RatingRoundingPipe } from '../../pipes/rating-rounding/rating-rounding.pipe';
import { EMPTY, Observable, switchMap, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectSelectedMovie } from '../../store/selectors';
import { ButtonModule } from 'primeng/button';
import * as MovieActions from '../../store/actions';
import { Router } from '@angular/router';
import { openLoginPopup } from '../../store/actions';

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
  isSubscribed$!: Observable<boolean>;

  constructor(private store: Store, private route: Router) {}

  ngOnInit() {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.movie$ = this.store.select(selectSelectedMovie);
    this.isSubscribed$ = this.store.select(selectIsSubscribed);
  }
  onWatch(movieId: number) {
    this.isLoggedIn$
      .pipe(
        take(1),
        switchMap((isLoggedIn) => {
          if (!isLoggedIn) {
            this.openLoginPopup();
            return EMPTY;
          }
          return this.isSubscribed$.pipe(
            take(1),
            tap((isSubscribed) => {
              if (isSubscribed) {
                this.route.navigate(['/movie/watch/', movieId]);
              } else {
                this.openSubscriptionPopup();
              }
            })
          );
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
