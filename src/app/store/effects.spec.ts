/* import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { MovieEffects } from './effects';
import * as MovieActions from './actions';
import { MovieService } from '../services/movie/movie.service';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { MovieApiModel } from '../models/movie';
import {
  mockCreateSessionIdResponse,
  mockGenres,
  mockMovie,
  mockMovies,
  mockPermissionResponse,
  mockRequestTokenResponse,
} from '../mocks/movie-mocks';

describe('MovieEffects', () => {
  let effects: MovieEffects;
  let actions$: Actions;
  let movieService: MovieService;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieEffects,
        provideMockActions(() => actions$),
        {
          provide: MovieService,
          useValue: {
            getPopularMovies: jest.fn(),
            getNowPlayingMovies: jest.fn(),
            getTopRatedMovies: jest.fn(),
            getUpcomingMovies: jest.fn(),
            getMovieDetails: jest.fn(),
            getFavouriteMovies: jest.fn(),
            getWatchListMovies: jest.fn(),
            updateList: jest.fn(),
            searchMovies: jest.fn(),
            getGenres: jest.fn(),
            getMoviesByGenres: jest.fn(),
            getMoviesByRating: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            getRequestToken: jest.fn(),
            askForPermission: jest.fn(),
            createSessionId: jest.fn(),
            setSessionId: jest.fn(),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
          },
        },
      ],
    });

    effects = TestBed.inject(MovieEffects);
    actions$ = TestBed.inject(Actions);
    movieService = TestBed.inject(MovieService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  describe('loadPopularMovies$', () => {
    it('should return loadPopularMoviesSuccess on success', (done) => {
      const movies: MovieApiModel = {
        page: 1,
        total_results: mockMovies.length,
        total_pages: 1,
        results: mockMovies,
      };

      const action = MovieActions.loadPopularMovies();
      const outcome = MovieActions.loadPopularMoviesSuccess({
        movies: movies.results,
      });

      actions$ = of(action);
      jest.spyOn(movieService, 'getPopularMovies').mockReturnValue(of(movies));

      effects.loadPopularMovies$.subscribe((result) => {
        expect(result).toEqual(outcome);
        done();
      });
    });

    it('should return loadPopularMoviesFailure on error', () => {
      const error = new Error('Error');
      const action = MovieActions.loadPopularMovies();
      const outcome = MovieActions.loadPopularMoviesFailure({ error });

      actions$ = of(action);
      jest
        .spyOn(movieService, 'getPopularMovies')
        .mockReturnValue(throwError(() => error));

      effects.loadPopularMovies$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });
  });

  describe('loadNowPlayingMovies$', () => {
    it('should return loadNowPlayingMoviesSuccess on success', () => {
      const movies: MovieApiModel = {
        page: 1,
        total_results: mockMovies.length,
        total_pages: 1,
        results: mockMovies,
      };
      const action = MovieActions.loadNowPlayingMovies();
      const outcome = MovieActions.loadNowPlayingMoviesSuccess({ movies: [] });

      actions$ = of(action);
      jest
        .spyOn(movieService, 'getNowPlayingMovies')
        .mockReturnValue(of(movies));

      effects.loadNowPlayingMovies$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });

    it('should return loadNowPlayingMoviesFailure on error', () => {
      const error = new Error('Error');
      const action = MovieActions.loadNowPlayingMovies();
      const outcome = MovieActions.loadNowPlayingMoviesFailure({ error });

      actions$ = of(action);
      jest
        .spyOn(movieService, 'getNowPlayingMovies')
        .mockReturnValue(throwError(() => error));

      effects.loadNowPlayingMovies$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });
  });

  describe('loadTopRatedMovies$', () => {
    it('should return loadTopRatedMoviesSuccess on success', () => {
      const movies: MovieApiModel = {
        page: 1,
        total_results: mockMovies.length,
        total_pages: 1,
        results: mockMovies,
      };
      const action = MovieActions.loadTopRatedMovies();
      const outcome = MovieActions.loadTopRatedMoviesSuccess({ movies: [] });

      actions$ = of(action);
      jest.spyOn(movieService, 'getTopRatedMovies').mockReturnValue(of(movies));

      effects.loadTopRatedMovies$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });

    it('should return loadTopRatedMoviesFailure on error', () => {
      const error = new Error('Error');
      const action = MovieActions.loadTopRatedMovies();
      const outcome = MovieActions.loadTopRatedMoviesFailure({ error });

      actions$ = of(action);
      jest
        .spyOn(movieService, 'getTopRatedMovies')
        .mockReturnValue(throwError(() => error));

      effects.loadTopRatedMovies$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });
  });

  describe('loadUpcomingMovies$', () => {
    it('should return loadUpcomingMoviesSuccess on success', () => {
      const movies: MovieApiModel = {
        page: 1,
        total_results: mockMovies.length,
        total_pages: 1,
        results: mockMovies,
      };
      const action = MovieActions.loadUpcomingMovies();
      const outcome = MovieActions.loadUpcomingMoviesSuccess({ movies: [] });

      actions$ = of(action);
      jest.spyOn(movieService, 'getUpcomingMovies').mockReturnValue(of(movies));

      effects.loadUpcomingMovies$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });

    it('should return loadUpcomingMoviesFailure on error', () => {
      const error = new Error('Error');
      const action = MovieActions.loadUpcomingMovies();
      const outcome = MovieActions.loadUpcomingMoviesFailure({ error });

      actions$ = of(action);
      jest
        .spyOn(movieService, 'getUpcomingMovies')
        .mockReturnValue(throwError(() => error));

      effects.loadUpcomingMovies$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });
  });

  describe('loadMovieDetails$', () => {
    it('should return loadMovieDetailsSuccess on success', (done) => {
      const movie = mockMovie;
      const action = MovieActions.loadMovieDetails({ movieId: 1 });
      const outcome = MovieActions.loadMovieDetailsSuccess({ movie });

      actions$ = of(action);
      jest.spyOn(movieService, 'getMovieDetails').mockReturnValue(of(movie));

      effects.loadMovieDetails$.subscribe((result) => {
        expect(result).toEqual(outcome);
        done();
      });
    });

    it('should return loadMovieDetailsFailure on error', () => {
      const error = new Error('Error');
      const action = MovieActions.loadMovieDetails({ movieId: 1 });
      const outcome = MovieActions.loadMovieDetailsFailure({ error });

      actions$ = of(action);
      jest
        .spyOn(movieService, 'getMovieDetails')
        .mockReturnValue(throwError(() => error));

      effects.loadMovieDetails$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });
  });

  describe('loadFavouriteMovies$', () => {
    it('should return loadFavouriteMoviesSuccess on success', () => {
      const movies = mockMovies;
      const action = MovieActions.loadFavouriteMovies();
      const outcome = MovieActions.loadFavouriteMoviesSuccess({ movies });

      actions$ = of(action);
      jest
        .spyOn(movieService, 'getFavouriteMovies')
        .mockReturnValue(of(movies));

      effects.loadFavouriteMovies$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });

    it('should return loadFavouriteMoviesFailure on error', () => {
      const error = new Error('Error');
      const action = MovieActions.loadFavouriteMovies();
      const outcome = MovieActions.loadFavouriteMoviesFailure({ error });

      actions$ = of(action);
      jest
        .spyOn(movieService, 'getFavouriteMovies')
        .mockReturnValue(throwError(() => error));

      effects.loadFavouriteMovies$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });
  });

  describe('loadWatchListMovies$', () => {
    it('should return loadWatchListMoviesSuccess on success', () => {
      const movies = mockMovies;
      const action = MovieActions.loadWatchListMovies();
      const outcome = MovieActions.loadWatchListMoviesSuccess({ movies });

      actions$ = of(action);
      jest
        .spyOn(movieService, 'getWatchListMovies')
        .mockReturnValue(of(movies));

      effects.loadWatchListMovies$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });

    it('should return loadWatchListMoviesFailure on error', () => {
      const error = new Error('Error');
      const action = MovieActions.loadWatchListMovies();
      const outcome = MovieActions.loadWatchListMoviesFailure({ error });

      actions$ = of(action);
      jest
        .spyOn(movieService, 'getWatchListMovies')
        .mockReturnValue(throwError(() => error));

      effects.loadWatchListMovies$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });
  });

  describe('setMovieToFavourites$', () => {
    it('should return loadFavouriteMovies on success', () => {
      const action = MovieActions.setMovieToFavourites({ movieId: 1 });
      const outcome = MovieActions.loadFavouriteMovies();

      actions$ = of(action);
      jest.spyOn(movieService, 'updateList').mockReturnValue(of({}));

      effects.setMovieToFavourites$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });

    it('should return loadFavouriteMoviesFailure on error', () => {
      const error = new Error('Error');
      const action = MovieActions.setMovieToFavourites({ movieId: 1 });
      const outcome = MovieActions.loadFavouriteMoviesFailure({ error });

      actions$ = of(action);
      jest
        .spyOn(movieService, 'updateList')
        .mockReturnValue(throwError(() => error));

      effects.setMovieToFavourites$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });
  });

  describe('removeMovieFromFavourites$', () => {
    it('should return loadFavouriteMovies on success', () => {
      const action = MovieActions.removeMovieFromFavourites({ movieId: 1 });
      const outcome = MovieActions.loadFavouriteMovies();

      actions$ = of(action);
      jest.spyOn(movieService, 'updateList').mockReturnValue(of({}));

      effects.removeMovieFromFavourites$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });

    it('should return loadFavouriteMoviesFailure on error', () => {
      const error = new Error('Error');
      const action = MovieActions.removeMovieFromFavourites({ movieId: 1 });
      const outcome = MovieActions.loadFavouriteMoviesFailure({ error });

      actions$ = of(action);
      jest
        .spyOn(movieService, 'updateList')
        .mockReturnValue(throwError(() => error));

      effects.removeMovieFromFavourites$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });
  });

  describe('setMovieToWatchList$', () => {
    it('should return loadWatchListMovies on success', () => {
      const action = MovieActions.setMovieToWatchList({ movieId: 1 });
      const outcome = MovieActions.loadWatchListMovies();

      actions$ = of(action);
      jest.spyOn(movieService, 'updateList').mockReturnValue(of({}));

      effects.setMovieToWatchList$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });

    it('should return loadWatchListMoviesFailure on error', () => {
      const error = new Error('Error');
      const action = MovieActions.setMovieToWatchList({ movieId: 1 });
      const outcome = MovieActions.loadWatchListMoviesFailure({ error });

      actions$ = of(action);
      jest
        .spyOn(movieService, 'updateList')
        .mockReturnValue(throwError(() => error));

      effects.setMovieToWatchList$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });
  });

  describe('removeMovieFromWatchList$', () => {
    it('should return loadWatchListMovies on success', () => {
      const action = MovieActions.removeMovieFromWatchList({ movieId: 1 });
      const outcome = MovieActions.loadWatchListMovies();

      actions$ = of(action);
      jest.spyOn(movieService, 'updateList').mockReturnValue(of({}));

      effects.removeMovieFromWatchList$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });

    it('should return loadWatchListMoviesFailure on error', () => {
      const error = new Error('Error');
      const action = MovieActions.removeMovieFromWatchList({ movieId: 1 });
      const outcome = MovieActions.loadWatchListMoviesFailure({ error });

      actions$ = of(action);
      jest
        .spyOn(movieService, 'updateList')
        .mockReturnValue(throwError(() => error));

      effects.removeMovieFromWatchList$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });
  });

  describe('login$', () => {
    it('should return loginSuccess on success', (done) => {
      const sessionId = 'sessionId';
      const action = MovieActions.login({ username: 'user', password: 'pass' });
      const outcome = MovieActions.loginSuccess({ sessionId });

      jest
        .spyOn(authService, 'getRequestToken')
        .mockReturnValue(of(mockRequestTokenResponse));
      jest
        .spyOn(authService, 'askForPermission')
        .mockReturnValue(of(mockPermissionResponse));
      jest
        .spyOn(authService, 'createSessionId')
        .mockReturnValue(of(mockCreateSessionIdResponse));
      jest.spyOn(authService, 'setSessionId').mockImplementation(() => {});

      actions$ = of(action);

      effects.login$.subscribe((result) => {
        expect(result).toEqual(outcome);
        done();
      });
    });

    it('should return loginFailure on error', () => {
      const error = new Error('Error');
      const action = MovieActions.login({ username: 'user', password: 'pass' });
      const outcome = MovieActions.loginFailure({ error: error.message });

      jest
        .spyOn(authService, 'getRequestToken')
        .mockReturnValue(throwError(() => error));

      actions$ = of(action);

      effects.login$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });
  });

  describe('loginSuccess$', () => {
    it('should navigate to redirectUrl and close login popup', () => {
      const redirectUrl = '/home';
      const action = MovieActions.loginSuccess({
        sessionId: 'sessionId',
        redirectUrl,
      });
      const outcome = MovieActions.closeLoginPopup();

      jest
        .spyOn(router, 'navigate')
        .mockImplementation(() => Promise.resolve(true));

      actions$ = of(action);

      effects.loginSuccess$.subscribe((result) => {
        expect(result).toEqual(outcome);
        expect(router.navigate).toHaveBeenCalledWith([redirectUrl]);
      });
    });
  });

  describe('searchMovies$', () => {
    it('should return searchMoviesSuccess on success', () => {
      const movies = mockMovies;
      const action = MovieActions.searchMovies({ query: 'query' });
      const outcome = MovieActions.searchMoviesSuccess({ movies });

      actions$ = of(action);
      jest.spyOn(movieService, 'searchMovies').mockReturnValue(of(movies));

      effects.searchMovies$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });

    it('should return searchMoviesFailure on error', () => {
      const error = new Error('Error');
      const action = MovieActions.searchMovies({ query: 'query' });
      const outcome = MovieActions.searchMoviesFailure({
        error: error.message,
      });

      actions$ = of(action);
      jest
        .spyOn(movieService, 'searchMovies')
        .mockReturnValue(throwError(() => error));

      effects.searchMovies$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });
  });

  describe('loadGenres$', () => {
    it('should return loadGenresSuccess on success', () => {
      const genres = mockGenres;
      const action = MovieActions.loadGenres();
      const outcome = MovieActions.loadGenresSuccess({ genres });

      actions$ = of(action);
      jest.spyOn(movieService, 'getGenres').mockReturnValue(of({ genres }));

      effects.loadGenres$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });

    it('should return loadGenresFailure on error', () => {
      const error = new Error('Error');
      const action = MovieActions.loadGenres();
      const outcome = MovieActions.loadGenresFailure({ error });

      actions$ = of(action);
      jest
        .spyOn(movieService, 'getGenres')
        .mockReturnValue(throwError(() => error));

      effects.loadGenres$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });
  });

  describe('loadMoviesByGenres$', () => {
    it('should return loadMoviesByGenresSuccess on success', () => {
      const movies: MovieApiModel = {
        page: 1,
        total_results: mockMovies.length,
        total_pages: 1,
        results: mockMovies,
      };
      const action = MovieActions.loadMoviesByGenres({ genres: [] });
      const outcome = MovieActions.loadMoviesByGenresSuccess({ movies: [] });

      actions$ = of(action);
      jest.spyOn(movieService, 'getMoviesByGenres').mockReturnValue(of(movies));

      effects.loadMoviesByGenres$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });

    it('should return loadMoviesByGenresFailure on error', () => {
      const error = new Error('Error');
      const action = MovieActions.loadMoviesByGenres({ genres: [] });
      const outcome = MovieActions.loadMoviesByGenresFailure({ error });

      actions$ = of(action);
      jest
        .spyOn(movieService, 'getMoviesByGenres')
        .mockReturnValue(throwError(() => error));

      effects.loadMoviesByGenres$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });
  });

  describe('loadMoviesByRating$', () => {
    it('should return loadMoviesByRatingSuccess on success', () => {
      const movies: MovieApiModel = {
        page: 1,
        total_results: mockMovies.length,
        total_pages: 1,
        results: mockMovies,
      };
      const action = MovieActions.loadMoviesByRating({ rating: 5 });
      const outcome = MovieActions.loadMoviesByRatingSuccess({ movies: [] });

      actions$ = of(action);
      jest.spyOn(movieService, 'getMoviesByRating').mockReturnValue(of(movies));

      effects.loadMoviesByRating$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });

    it('should return loadMoviesByRatingFailure on error', () => {
      const error = new Error('Error');
      const action = MovieActions.loadMoviesByRating({ rating: 5 });
      const outcome = MovieActions.loadMoviesByRatingFailure({ error });

      actions$ = of(action);
      jest
        .spyOn(movieService, 'getMoviesByRating')
        .mockReturnValue(throwError(() => error));

      effects.loadMoviesByRating$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });
  });
});
 */
