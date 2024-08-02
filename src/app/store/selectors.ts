import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MovieState } from './state';

export const selectState = createFeatureSelector<MovieState>('MovieState');

export const selectPopularMovies = createSelector(
  selectState,
  (state) => state.popularMovies
);

export const selectNowPlayingMovies = createSelector(
  selectState,
  (state) => state.nowPlayingMovies
);

export const selectTopRatedMovies = createSelector(
  selectState,
  (state) => state.topRatedMovies
);

export const selectUpcomingMovies = createSelector(
  selectState,
  (state) => state.upcomingMovies
);

export const selectSelectedMovie = createSelector(
  selectState,
  (state) => state.selectedMovie
);

export const selectFavouriteMovies = createSelector(
  selectState,
  (state) => state.favouriteMovies
);

export const selectWatchListMovies = createSelector(
  selectState,
  (state) => state.watchListMovies
);
