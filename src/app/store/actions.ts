import { createAction, props } from '@ngrx/store';
import { Movie } from '../models/movie';

export const loadPopularMovies = createAction('[Movie] Load Popular Movies');

export const loadPopularMoviesSuccess = createAction(
  '[Movie] Load Popular Movies Success',
  props<{ movies: Movie[] | null }>()
);

export const loadPopularMoviesFailure = createAction(
  '[Movie] Load Popular Moviess Failure',
  props<{ error: any }>()
);

export const loadNowPlayingMovies = createAction(
  '[Movie] Load Now Playing Movies'
);

export const loadNowPlayingMoviesSuccess = createAction(
  '[Movie] Load Now Playing Movies Success',
  props<{ movies: Movie[] | null }>()
);

export const loadNowPlayingMoviesFailure = createAction(
  '[Movie] Load Now Playing Moviess Failure',
  props<{ error: any }>()
);

export const loadTopRatedMovies = createAction('[Movie] Load Top Rated Movies');

export const loadTopRatedMoviesSuccess = createAction(
  '[Movie] Load Top Rated Movies Success',
  props<{ movies: Movie[] | null }>()
);

export const loadTopRatedMoviesFailure = createAction(
  '[Movie] Load Top Rated Moviess Failure',
  props<{ error: any }>()
);

export const loadUpcomingMovies = createAction('[Movie] Load Upcoming Movies');

export const loadUpcomingMoviesSuccess = createAction(
  '[Movie] Load Upcoming Movies Success',
  props<{ movies: Movie[] | null }>()
);

export const loadUpcomingMoviesFailure = createAction(
  '[Movie] Load Upcoming Movies Failure',
  props<{ error: any }>()
);

export const loadMovieDetails = createAction(
  '[Movie] Load Movie Details',
  props<{ movieId: number }>()
);

export const loadMovieDetailsSuccess = createAction(
  '[Movie] Load Movie Details Success',
  props<{ movie: Movie }>()
);

export const loadMovieDetailsFailure = createAction(
  '[Movie] Load Movie Details Failure',
  props<{ error: any }>()
);

export const loadFavouriteMovies = createAction(
  '[Movie] Load Favourite Movies'
);

export const loadFavouriteMoviesSuccess = createAction(
  '[Movie] Load Favourite Movies Success',
  props<{ movies: Movie[] | null }>()
);

export const loadFavouriteMoviesFailure = createAction(
  '[Movie] Load Favourite Moviess Failure',
  props<{ error: any }>()
);

export const setMovieToFavourites = createAction(
  '[Movies] Set Movie To Favourites',
  props<{ movieId: number }>()
);

export const removeMovieFromFavourites = createAction(
  '[Movies] Remove Movie From Favourites',
  props<{ movieId: number }>()
);

export const loadWatchListMovies = createAction(
  '[Movie] Load WatchList Movies'
);

export const loadWatchListMoviesSuccess = createAction(
  '[Movie] Load WatchList Movies Success',
  props<{ movies: Movie[] | null }>()
);

export const loadWatchListMoviesFailure = createAction(
  '[Movie] Load WatchList Moviess Failure',
  props<{ error: any }>()
);

export const setMovieToWatchList = createAction(
  '[Movies] Set Movie To WatchList',
  props<{ movieId: number }>()
);

export const removeMovieFromWatchList = createAction(
  '[Movies] Remove Movie From WatchList',
  props<{ movieId: number }>()
);
