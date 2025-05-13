import { Injectable } from '@angular/core';
import { Genre, Movie, MovieApiModel } from '../../models/movie';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';
import { MovieListResponse } from '../../models/responce.inetrface';
import { Store } from '@ngrx/store';
import { selectGenres } from '../../store/selectors';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private cache = new Map<string, any>();

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private store: Store
  ) {}

  private getCachedData<T>(
    url: string,
    params?: Record<string, string>
  ): Observable<T> {
    const fullUrl = this.constructFullUrl(url, params);

    if (this.cache.has(fullUrl)) {
      return of(this.cache.get(fullUrl)! as T);
    } else {
      return this.httpClient
        .get<T>(fullUrl)
        .pipe(tap((data) => this.cache.set(fullUrl, data)));
    }
  }

  private constructFullUrl(
    url: string,
    params?: Record<string, string>
  ): string {
    if (!params) {
      return url;
    }

    const queryParams = new URLSearchParams(params).toString();
    return `${url}?${queryParams}`;
  }

  getPopularMovies(): Observable<MovieApiModel> {
    return this.getCachedData(
      `${environment.apiBaseUrl}/movie/popular?api_key=${environment.apiKey}`
    );
  }

  getTopRatedMovies(): Observable<MovieApiModel> {
    return this.getCachedData(
      `${environment.apiBaseUrl}/movie/top_rated?api_key=${environment.apiKey}`
    );
  }

  getNowPlayingMovies(): Observable<MovieApiModel> {
    return this.getCachedData(
      `${environment.apiBaseUrl}/movie/now_playing?api_key=${environment.apiKey}`
    );
  }

  getUpcomingMovies(): Observable<MovieApiModel> {
    return this.getCachedData(
      `${environment.apiBaseUrl}/movie/upcoming?api_key=${environment.apiKey}`
    );
  }

  getRecomendationMovies(): Observable<MovieApiModel> {
    return this.getCachedData(
      `${environment.apiBaseUrl}/movie/upcoming?api_key=${environment.apiKey}`
    );
  }

  getMovieDetails(movieId: number): Observable<Movie> {
    return this.getCachedData(
      `${environment.apiBaseUrl}/movie/${movieId}?api_key=${environment.apiKey}`
    );
  }

  getMoviesByParams(params: Record<string, string>): Observable<MovieApiModel> {
    return this.httpClient.get<MovieApiModel>(
      `${environment.apiBaseUrl}/discover/movie`,
      this.getOptions(params)
    );
  }

  getMoviesByGenres(genres: number[]): Observable<MovieApiModel> {
    return this.getMoviesByParams({ with_genres: genres.join(',') });
  }

  getMoviesByRating(rating: number): Observable<MovieApiModel> {
    return this.getMoviesByParams({ 'vote_average.gte': rating.toString() });
  }

  getGenres() {
    return this.httpClient.get<{ genres: Genre[] }>(
      `${environment.apiBaseUrl}/genre/movie/list?api_key=${environment.apiKey}`
    );
  }

  private getOptions(params: Record<string, string> = {}): {
    params: HttpParams;
  } {
    return {
      params: new HttpParams({
        fromObject: { ...params, api_key: environment.apiKey },
      }),
    };
  }

  updateList(listType: string, id: number, isAdding: boolean): Observable<any> {
    const sessionId = this.authService.getSessionId();
    if (!sessionId) {
      return of([]);
    }

    const body = {
      media_type: 'movie',
      media_id: id,
      [listType]: isAdding,
    };

    return this.httpClient.post(
      `${environment.apiBaseUrl}/account/${environment.accountId}/${listType}`,
      body,
      this.getOptions({ session_id: sessionId })
    );
  }

  getFavouriteMovies() {
    const sessionId = this.authService.getSessionId();
    if (sessionId) {
      const params: Record<string, string> = { session_id: sessionId };
      return this.httpClient
        .get<MovieListResponse>(
          `${environment.apiBaseUrl}/account/${environment.accountId}/favorite/movies`,
          this.getOptions(params)
        )
        .pipe(map((response) => response.results));
    }
    return of([]);
  }

  getWatchListMovies() {
    const sessionId = this.authService.getSessionId();
    if (sessionId) {
      const params: Record<string, string> = { session_id: sessionId };
      return this.httpClient
        .get<MovieListResponse>(
          `${environment.apiBaseUrl}/account/${environment.accountId}/watchlist/movies`,
          this.getOptions(params)
        )
        .pipe(map((response) => response.results));
    }
    return of([]);
  }

  searchMovies(query: string): Observable<Movie[]> {
    return this.httpClient
      .get<{ results: Movie[] }>(
        `${environment.apiBaseUrl}/search/movie?api_key=${environment.apiKey}&query=${query}`
      )
      .pipe(
        map((response) => {
          return response.results;
        })
      );
  }

  getGenreNames(genreIds: number[]): Observable<Genre[]> {
    return this.store
      .select(selectGenres)
      .pipe(
        map(
          (genres) =>
            genreIds
              .map((id) => genres?.find((genre) => genre.id === id))
              .filter((genre) => genre !== undefined) as Genre[]
        )
      );
  }

  checkIfMovieInList(
    movieId: number,
    list$: Observable<Movie[] | null>
  ): Observable<boolean> {
    return list$.pipe(
      map((movies) => movies?.some((movie) => movie.id === movieId) || false)
    );
  }
}
