/* import { MovieReducer } from './reducers';
import * as MovieActions from './actions';
import { initialState } from './state';
import { Movie } from '../models/movie';
import { mockMovie, mockMovie2, mockMovies } from '../mocks/movie-mocks';

describe('MovieReducer', () => {
  it('should return the correct state for loadPopularMoviesSuccess action', () => {
    const movies = mockMovies;

    const action = MovieActions.loadPopularMoviesSuccess({ movies });

    const result = MovieReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      popularMovies: movies,
      filteredMovies: null,
    });
  });

  it('should return the correct state for loadNowPlayingMoviesSuccess action', () => {
    const movies = mockMovies;

    const action = MovieActions.loadNowPlayingMoviesSuccess({ movies });

    const result = MovieReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      nowPlayingMovies: movies,
      filteredMovies: null,
    });
  });

  it('should return the correct state for setMovieToFavourites action', () => {
    const movieId = 1;
    const movie = mockMovie;

    const action = MovieActions.setMovieToFavourites({ movieId });
    const stateWithExistingFavourites = {
      ...initialState,
      favouriteMovies: [],
    };
    const updatedMovie = {
      id: movieId,
    } as Movie;

    const result = MovieReducer(stateWithExistingFavourites, action);

    expect(result).toEqual({
      ...stateWithExistingFavourites,
      favouriteMovies: [updatedMovie],
    });
  });

  it('should return the correct state for removeMovieFromFavourites action', () => {
    const movie1 = mockMovie;

    const movie2 = mockMovie2;

    const initialStateWithFavourites = {
      ...initialState,
      favouriteMovies: [movie1, movie2],
    };

    const movieId = 1;
    const action = MovieActions.removeMovieFromFavourites({ movieId });

    const result = MovieReducer(initialStateWithFavourites, action);

    expect(result).toEqual({
      ...initialStateWithFavourites,
      favouriteMovies: [movie2],
    });
  });

  it('should return the correct state for loadMovieDetailsSuccess action', () => {
    const movie = mockMovie;

    const action = MovieActions.loadMovieDetailsSuccess({ movie });

    const result = MovieReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      selectedMovie: movie,
    });
  });
});
 */
