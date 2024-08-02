import { createReducer, on } from '@ngrx/store';
import * as MovieActions from './actions';
import { initialState } from './state';
import { Movie } from '../models/movie';

export const MovieReducer = createReducer(
  initialState,

  on(MovieActions.loadPopularMoviesSuccess, (state, { movies }) => {
    return {
      ...state,
      popularMovies: movies,
    };
  }),

  on(MovieActions.loadPopularMoviesFailure, (state, { error }) => {
    return {
      ...state,
      popularMovies: null,
      error: error,
    };
  }),

  on(MovieActions.loadNowPlayingMoviesSuccess, (state, { movies }) => {
    return {
      ...state,
      nowPlayingMovies: movies,
    };
  }),

  on(MovieActions.loadNowPlayingMoviesFailure, (state, { error }) => {
    return {
      ...state,
      nowPlayingMovies: null,
      error: error,
    };
  }),

  on(MovieActions.loadTopRatedMoviesSuccess, (state, { movies }) => {
    return {
      ...state,
      topRatedMovies: movies,
    };
  }),

  on(MovieActions.loadTopRatedMoviesFailure, (state, { error }) => {
    return {
      ...state,
      topRatedMovies: null,
      error: error,
    };
  }),

  on(MovieActions.loadUpcomingMoviesSuccess, (state, { movies }) => {
    return {
      ...state,
      upcomingMovies: movies,
    };
  }),

  on(MovieActions.loadUpcomingMoviesFailure, (state, { error }) => {
    return {
      ...state,
      upcomingMovies: null,
      error: error,
    };
  }),

  on(MovieActions.loadMovieDetailsSuccess, (state, { movie }) => {
    return {
      ...state,
      selectedMovie: movie,
    };
  }),

  on(MovieActions.loadMovieDetailsFailure, (state, { error }) => {
    return {
      ...state,
      selectedMovie: null,
    };
  }),

  on(MovieActions.loadFavouriteMoviesSuccess, (state, { movies }) => {
    return {
      ...state,
      favouriteMovies: movies,
    };
  }),

  on(MovieActions.loadFavouriteMoviesFailure, (state, { error }) => {
    return {
      ...state,
      favouriteMovies: null,
      error: error,
    };
  }),

  on(MovieActions.setMovieToFavourites, (state, { movieId }) => ({
    ...state,
    favouriteMovies: state.favouriteMovies
      ? [...state.favouriteMovies, { id: movieId } as Movie]
      : [{ id: movieId } as Movie],
  })),

  on(MovieActions.removeMovieFromFavourites, (state, { movieId }) => ({
    ...state,
    favouriteMovies: state.favouriteMovies
      ? state.favouriteMovies.filter((movie) => movie.id !== movieId)
      : null,
  })),

  on(MovieActions.loadWatchListMoviesSuccess, (state, { movies }) => {
    return {
      ...state,
      watchListMovies: movies,
    };
  }),

  on(MovieActions.loadWatchListMoviesFailure, (state, { error }) => {
    return {
      ...state,
      watchListMovies: null,
      error: error,
    };
  }),

  on(MovieActions.setMovieToWatchList, (state, { movieId }) => ({
    ...state,
    watchListMovies: state.watchListMovies
      ? [...state.watchListMovies, { id: movieId } as Movie]
      : [{ id: movieId } as Movie],
  })),

  on(MovieActions.removeMovieFromWatchList, (state, { movieId }) => ({
    ...state,
    watchListMovies: state.watchListMovies
      ? state.watchListMovies.filter((movie) => movie.id !== movieId)
      : null,
  }))
);
