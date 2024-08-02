import { Movie } from '../models/movie';

export interface MovieState {
  popularMovies: Movie[] | null;
  nowPlayingMovies: Movie[] | null;
  topRatedMovies: Movie[] | null;
  upcomingMovies: Movie[] | null;
  favouriteMovies: Movie[] | null;
  watchListMovies: Movie[] | null;
  selectedMovie: Movie | null;
}

export const initialState: MovieState = {
  popularMovies: null,
  nowPlayingMovies: null,
  topRatedMovies: null,
  upcomingMovies: null,
  favouriteMovies: null,
  watchListMovies: null,
  selectedMovie: null,
};
