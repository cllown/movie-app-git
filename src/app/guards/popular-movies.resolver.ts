import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import * as MovieActions from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class PopularMoviesResolver implements Resolve<boolean> {
  constructor(private store: Store) {}

  resolve(): boolean {
    this.store.dispatch(MovieActions.loadGenres());
    this.store.dispatch(MovieActions.loadPopularMovies());
    return true;
  }
}