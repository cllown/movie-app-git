import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import * as MovieActions from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class MovieResolver implements Resolve<boolean> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot): boolean {
    const movieId = route.params['id'];

    this.store.dispatch(MovieActions.loadPopularMovies());
    this.store.dispatch(MovieActions.loadNowPlayingMovies());
    this.store.dispatch(MovieActions.loadTopRatedMovies());
    this.store.dispatch(MovieActions.loadUpcomingMovies());

    if (movieId) {
      this.store.dispatch(MovieActions.loadMovieDetails({ movieId: +movieId }));
    }

    return true;
  }
}
