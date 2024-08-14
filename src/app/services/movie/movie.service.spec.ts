import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { MovieApiModel } from '../../models/movie';
import {
  mockGenres,
  mockMovie,
  mockMovies,
} from '../../mocks/movie-mocks';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;
  let authServiceMock: any;
  let storeMock: any;

  beforeEach(() => {
    authServiceMock = {
      getSessionId: jest.fn(),
    };

    storeMock = {
      select: jest.fn().mockReturnValue(of([])),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MovieService,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Store, useValue: storeMock },
      ],
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch popular movies', () => {
    const movies: MovieApiModel = {
      page: 1,
      total_results: mockMovies.length,
      total_pages: 1,
      results: mockMovies,
    };

    service.getPopularMovies().subscribe((movies) => {
      expect(movies.results.length).toBe(1);
      expect(movies.results[0].title).toBe('Movie 1');
    });

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/movie/popular?api_key=${environment.apiKey}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(movies);
  });

  it('should fetch top-rated movies', () => {
    const movies: MovieApiModel = {
      page: 1,
      total_results: mockMovies.length,
      total_pages: 1,
      results: mockMovies,
    };

    service.getTopRatedMovies().subscribe((movies) => {
      expect(movies.results.length).toBe(1);
      expect(movies.results[0].title).toBe('Movie 2');
    });

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/movie/top_rated?api_key=${environment.apiKey}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(movies);
  });

  it('should fetch now playing movies', () => {
    const movies: MovieApiModel = {
      page: 1,
      total_results: mockMovies.length,
      total_pages: 1,
      results: mockMovies,
    };

    service.getNowPlayingMovies().subscribe((movies) => {
      expect(movies.results.length).toBe(1);
      expect(movies.results[0].title).toBe('Movie 3');
    });

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/movie/now_playing?api_key=${environment.apiKey}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(movies);
  });

  it('should fetch upcoming movies', () => {
    const movies: MovieApiModel = {
      page: 1,
      total_results: mockMovies.length,
      total_pages: 1,
      results: mockMovies,
    };

    service.getUpcomingMovies().subscribe((movies) => {
      expect(movies.results.length).toBe(1);
      expect(movies.results[0].title).toBe('Movie 4');
    });

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/movie/upcoming?api_key=${environment.apiKey}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(movies);
  });

  it('should fetch movie details', () => {
    const movie = mockMovie;

    service.getMovieDetails(1).subscribe((movie) => {
      expect(movie.id).toBe(1);
      expect(movie.title).toBe('Movie 1');
    });

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/movie/1?api_key=${environment.apiKey}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(movie);
  });

  it('should fetch movies by genres', () => {
    const movies: MovieApiModel = {
      page: 1,
      total_results: mockMovies.length,
      total_pages: 1,
      results: mockMovies,
    };

    service.getMoviesByGenres([1, 2, 3]).subscribe((movies) => {
      expect(movies.results.length).toBe(1);
    });

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/discover/movie?with_genres=1,2,3&api_key=${environment.apiKey}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(movies);
  });

  it('should fetch movies by rating', () => {
    const movies: MovieApiModel = {
      page: 1,
      total_results: mockMovies.length,
      total_pages: 1,
      results: mockMovies,
    };

    service.getMoviesByRating(7).subscribe((movies) => {
      expect(movies.results.length).toBe(1);
    });

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/discover/movie?vote_average.gte=7&api_key=${environment.apiKey}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(movies);
  });

  it('should update list with correct parameters', () => {
    const listType = 'favorite';
    const movieId = 123;
    const isAdding = true;
    authServiceMock.getSessionId.mockReturnValue('session123');

    service.updateList(listType, movieId, isAdding).subscribe();

    const req = httpMock.expectOne((request) => {
      return (
        request.url.startsWith(
          `${environment.apiBaseUrl}/account/${environment.accountId}/${listType}`
        ) &&
        request.params.get('session_id') === 'session123' &&
        request.params.get('api_key') === environment.apiKey
      );
    });

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      media_type: 'movie',
      media_id: movieId,
      favorite: isAdding,
    });

    req.flush({});
  });

  it('should fetch favorite movies if session exists', () => {
    authServiceMock.getSessionId.mockReturnValue('session123');
    const movies: MovieApiModel = {
      page: 1,
      total_results: mockMovies.length,
      total_pages: 1,
      results: mockMovies,
    };

    service.getFavouriteMovies().subscribe((movies) => {
      expect(movies.length).toBe(1);
      expect(movies[0].title).toBe('Movie 1');
    });

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/account/${environment.accountId}/favorite/movies?session_id=session123&api_key=${environment.apiKey}`
    );
    expect(req.request.method).toBe('GET');
    req.flush({ results: movies });
  });

  it('should return genre names', () => {
    const genres = mockGenres;

    storeMock.select.mockReturnValue(of(genres));

    service.getGenreNames([1, 2]).subscribe((genres) => {
      expect(genres.length).toBe(2);
      expect(genres[0].name).toBe('Action');
      expect(genres[1].name).toBe('Comedy');
    });
  });
});
