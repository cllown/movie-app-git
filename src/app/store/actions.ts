import { createAction, props } from '@ngrx/store';
import { Genre, Movie } from '../models/movie';

export const loadSessionFromStorage = createAction(
  '[Auth] Load Session From Storage'
);

export const sessionRestored = createAction(
  '[Auth] Session Restored',
  props<{ sessionId: string }>()
);

export const logout = createAction('[Auth] Logout');

export const loadPopularMovies = createAction('[Movie] Load Popular Movies');

export const loadPopularMoviesSuccess = createAction(
  '[Movie] Load Popular Movies Success',
  props<{ movies: Movie[] | null }>()
);

export const loadPopularMoviesFailure = createAction(
  '[Movie] Load Popular Moviess Failure',
  props<{ error: any }>()
);
export const loadRecomendationMovies = createAction(
  '[Movie] Load Recomendation Movies'
);

export const loadRecomendationMoviesSuccess = createAction(
  '[Movie] Load Recomendation Movies Success',
  props<{ movies: Movie[] | null }>()
);

export const loadRecomendationMoviesFailure = createAction(
  '[Movie] Load Recomendation Moviess Failure',
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

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string; redirectUrl?: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ sessionId: string; redirectUrl?: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);
export const subscribe = createAction('[Auth] subscribe');

export const openLoginPopup = createAction('[Auth] Open Login Popup');

export const closeLoginPopup = createAction('[Auth] Close Login Popup');

export const openMoodRecommendationPopup = createAction(
  '[Auth] Open Mood Recommendation Popup'
);

export const closeMoodRecommendationPopup = createAction(
  '[Auth] Close Mood Recommendation Popup'
);

export const openSubscriptionPopup = createAction(
  '[Auth] Open Subscription Popup'
);

export const closeSubscriptionPopup = createAction(
  '[Auth] Close Subscription Popup'
);

export const searchMovies = createAction(
  '[Movie] Search Movies',
  props<{ query: string }>()
);

export const searchMoviesSuccess = createAction(
  '[Movie] Search Movies Success',
  props<{ movies: Movie[] }>()
);

export const searchMoviesFailure = createAction(
  '[Movie] Search Movies Failure',
  props<{ error: string }>()
);

export const clearSearchResults = createAction('[Movie] Clear Search Results');

export const loadGenres = createAction('[Movie API] Load Genres');

export const loadGenresSuccess = createAction(
  '[Movie API] Load Genres Success',
  props<{ genres: Genre[] }>()
);

export const loadGenresFailure = createAction(
  '[Movie API] Load Genres Failure',
  props<{ error: any }>()
);

export const loadMoviesByGenres = createAction(
  '[Movies] Load Movies By Genres',
  props<{ genres: number[] }>()
);

export const loadMoviesByGenresSuccess = createAction(
  '[Movies] Load Movies By Genres Success',
  props<{ movies: Movie[] }>()
);

export const loadMoviesByGenresFailure = createAction(
  '[Movies] Load Movies By Genres Failure',
  props<{ error: any }>()
);

export const loadMoviesByRating = createAction(
  '[Movies] Load Movies By Rating',
  props<{ rating: number }>()
);

export const loadMoviesByRatingSuccess = createAction(
  '[Movies] Load Movies By Rating Success',
  props<{ movies: Movie[] }>()
);

export const loadMoviesByRatingFailure = createAction(
  '[Movies] Load Movies By Rating Failure',
  props<{ error: any }>()
);

//CUSTOM LISTS
export const loadCustomLists = createAction('[Profile] Load Custom Lists');

export const loadCustomListsSuccess = createAction(
  '[Profile] Load Custom Lists Success',
  props<{ customLists: { id: number; name: string }[] }>()
);

export const loadCustomListsFailure = createAction(
  '[Profile] Load Custom Lists Failure',
  props<{ error: any }>()
);

export const addMovieToCustomList = createAction(
  '[Movie] Add Movie To Custom List',
  props<{ movieId: number; listId: number }>()
);

export const addMovieToCustomListSuccess = createAction(
  '[Movie] Add Movie To Custom List Success',
  props<{ movieId: number; listId: number }>()
);

export const addMovieToCustomListFailure = createAction(
  '[Movie] Add Movie To Custom List Failure',
  props<{ error: any }>()
);

export const removeMovieFromCustomList = createAction(
  '[Movie] Remove Movie From Custom List',
  props<{ movieId: number; listId: number }>()
);

export const removeMovieFromCustomListSuccess = createAction(
  '[Movie] Remove Movie From Custom List Success',
  props<{ movieId: number; listId: number }>()
);

export const removeMovieFromCustomListFailure = createAction(
  '[Movie] Remove Movie ToFrom Custom List Failure',
  props<{ error: any }>()
);
