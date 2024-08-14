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

export const selectAllMovies = createSelector(
  selectPopularMovies,
  selectNowPlayingMovies,
  selectTopRatedMovies,
  selectUpcomingMovies,
  (popularMovies, nowPlayingMovies, topRatedMovies, upcomingMovies) => {
    return [
      ...(popularMovies || []),
      ...(nowPlayingMovies || []),
      ...(topRatedMovies || []),
      ...(upcomingMovies || []),
    ];
  }
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

export const selectUsername = createSelector(
  selectState,
  (state) => state.username
);

export const selectPassword = createSelector(
  selectState,
  (state) => state.password
);

export const selectIsLoggedIn = createSelector(
  selectState,
  (state) => state.isLoggedIn
);

export const selectLoading = createSelector(
  selectState,
  (state) => state.loading
);

export const selectIsPopupVisible = createSelector(
  selectState,
  (state) => state.isPopupVisible ?? false
);

export const selectError = createSelector(selectState, (state) => state.error);

export const selectSearchingMovies = createSelector(
  selectState,
  (state) => state.searchResults
);

export const selectGenres = createSelector(
  selectState,
  (state) => state.genres
);

export const selectFilteredMovies = createSelector(
  selectState,
  (state) => state.filteredMovies
);
