import { Genre, Movie } from '../models/movie';

export interface MovieState {
  popularMovies: Movie[] | null;
  nowPlayingMovies: Movie[] | null;
  topRatedMovies: Movie[] | null;
  upcomingMovies: Movie[] | null;
  favouriteMovies: Movie[] | null;
  watchListMovies: Movie[] | null;
  selectedMovie: Movie | null;
  username: string | null;
  password: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  isPopupVisible: boolean;
  error: string | null;
  searchResults: Movie[] | null;
  searchError: string | null;
  genres: Genre[] | null;
  filteredMovies: Movie[] | null;
}

export const initialState: MovieState = {
  popularMovies: null,
  nowPlayingMovies: null,
  topRatedMovies: null,
  upcomingMovies: null,
  favouriteMovies: null,
  watchListMovies: null,
  selectedMovie: null,
  username: null,
  password: null,
  isLoggedIn: false,
  loading: false,
  isPopupVisible: false,
  error: null,
  searchResults: null,
  searchError: null,
  genres: null,
  filteredMovies: null,
};
