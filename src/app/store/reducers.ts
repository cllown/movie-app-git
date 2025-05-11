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
      filteredMovies: null,
    };
  }),

  on(MovieActions.loadPopularMoviesFailure, (state, { error }) => {
    return {
      ...state,
      popularMovies: null,
      error: error,
      filteredMovies: null,
    };
  }),

  on(MovieActions.loadNowPlayingMoviesSuccess, (state, { movies }) => {
    return {
      ...state,
      nowPlayingMovies: movies,
      filteredMovies: null,
    };
  }),

  on(MovieActions.loadNowPlayingMoviesFailure, (state, { error }) => {
    return {
      ...state,
      nowPlayingMovies: null,
      error: error,
      filteredMovies: null,
    };
  }),

  on(MovieActions.loadTopRatedMoviesSuccess, (state, { movies }) => {
    return {
      ...state,
      topRatedMovies: movies,
      filteredMovies: null,
    };
  }),

  on(MovieActions.loadTopRatedMoviesFailure, (state, { error }) => {
    return {
      ...state,
      topRatedMovies: null,
      error: error,
      filteredMovies: null,
    };
  }),

  on(MovieActions.loadUpcomingMoviesSuccess, (state, { movies }) => {
    return {
      ...state,
      upcomingMovies: movies,
      filteredMovies: null,
    };
  }),

  on(MovieActions.loadUpcomingMoviesFailure, (state, { error }) => {
    return {
      ...state,
      upcomingMovies: null,
      error: error,
      filteredMovies: null,
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
  })),

  on(MovieActions.login, (state, { username, password }) => ({
    ...state,
    username,
    password,
    loading: true,
    error: null,
  })),

  on(MovieActions.loginSuccess, (state, { sessionId }) => ({
    ...state,
    isLoggedIn: true,
    loading: false,
    error: null,
  })),

  on(MovieActions.logout, (state) => ({
    ...state,
    user: null,
    sessionId: null,
    isLoggedIn: false,
    error: null,
  })),

  on(MovieActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(MovieActions.openLoginPopup, (state) => ({
    ...state,
    isPopupVisible: true,
  })),

  on(MovieActions.closeLoginPopup, (state) => ({
    ...state,
    isPopupVisible: false,
  })),

  on(MovieActions.openRegisterPopup, (state) => ({
    ...state,
    isRegisterPopupVisible: true,
  })),

  on(MovieActions.closeRegisterPopup, (state) => ({
    ...state,
    isRegisterPopupVisible: false,
  })),

  on(MovieActions.register, (state) => ({
    ...state,
    isRegistering: true,
    registerError: null,
  })),

  on(MovieActions.registerSuccess, (state) => ({
    ...state,
    isRegistering: false,
    isLoggedIn: true,
  })),

  on(MovieActions.registerFailure, (state, { error }) => ({
    ...state,
    isRegistering: false,
    registerError: error,
  })),

  on(MovieActions.searchMoviesSuccess, (state, { movies }) => ({
    ...state,
    searchResults: movies,
  })),

  on(MovieActions.searchMoviesFailure, (state, { error }) => ({
    ...state,
    searchError: error,
  })),

  on(MovieActions.clearSearchResults, (state) => ({
    ...state,
    searchResults: null,
  })),

  on(MovieActions.loadGenresSuccess, (state, { genres }) => ({
    ...state,
    genres,
  })),

  on(MovieActions.loadGenresFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(MovieActions.loadMoviesByGenresSuccess, (state, { movies }) => ({
    ...state,
    filteredMovies: movies,
  })),

  on(MovieActions.loadMoviesByGenresFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(MovieActions.loadMoviesByRatingSuccess, (state, { movies }) => ({
    ...state,
    filteredMovies: movies,
  })),

  on(MovieActions.loadMoviesByRatingFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
