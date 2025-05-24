import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import * as MovieActions from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsResolver implements Resolve<boolean> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot): boolean {
    const movieId = route.params['id'];
    this.store.dispatch(MovieActions.loadGenres());
    this.store.dispatch(MovieActions.loadCustomLists());
    this.store.dispatch(MovieActions.loadMovieDetails({ movieId: +movieId }));
    return true;
  }
}
