import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import * as MovieActions from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class AllMoviesResolver implements Resolve<boolean> {
  constructor(private store: Store) {}

  resolve(): boolean {
    this.store.dispatch(MovieActions.loadGenres());
    this.store.dispatch(MovieActions.loadPopularMovies());
    this.store.dispatch(MovieActions.loadNowPlayingMovies());
    this.store.dispatch(MovieActions.loadTopRatedMovies());
    this.store.dispatch(MovieActions.loadUpcomingMovies());
    this.store.dispatch(MovieActions.loadRecomendationMovies());
    this.store.dispatch(MovieActions.loadCustomLists());
    return true;
  }
}
