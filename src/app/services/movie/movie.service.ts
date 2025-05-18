import { Injectable } from '@angular/core';
import { Genre, Movie, MovieApiModel } from '../../models/movie';
import {
  BehaviorSubject,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';
import {
  CustomListDetailsResponse,
  MovieListResponse,
} from '../../models/responce.inetrface';
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

  getRecommendationForMovie(movieId: number): Observable<MovieApiModel> {
    return this.getCachedData(
      `${environment.apiBaseUrl}/movie/${movieId}/recommendations?api_key=${environment.apiKey}`
    );
  }

  getSmartRecommendations(userLikedMovies: number[]): Observable<Movie[]> {
    const topLikedIds = userLikedMovies;

    const requests$ = topLikedIds.map((id) =>
      this.getRecommendationForMovie(id)
    );

    return forkJoin(requests$).pipe(
      map((results) => {
        const allMovies = results.flatMap((r) => r.results);
        const uniqueMoviesMap = new Map<number, Movie>();

        for (const movie of allMovies) {
          if (!userLikedMovies.includes(movie.id)) {
            uniqueMoviesMap.set(movie.id, movie);
          }
        }

        return Array.from(uniqueMoviesMap.values());
      })
    );
  }
  getPersonalRecommendations(): Observable<Movie[]> {
    return this.getFavouriteMovies().pipe(
      map((favourites) => favourites.map((movie) => movie.id)),
      switchMap((ids) => {
        if (!ids.length) {
          return of([]);
        }
        return this.getSmartRecommendations(ids);
      })
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
  //CUSTOM LISTS

  // 1. Создание кастомного списка
  createCustomList(
    name: string,
    description = '',
    isPublic = true
  ): Observable<any> {
    const sessionId = this.authService.getSessionId();
    if (!sessionId) return of(null);

    const body = {
      name,
      description,
      language: 'en',
      public: isPublic,
    };

    return this.httpClient.post(
      `${environment.apiBaseUrl}/list`,
      body,
      this.getOptions({ session_id: sessionId })
    );
  }

  // 2. Удаление кастомного списка
  deleteCustomList(listId: number): Observable<any> {
    const sessionId = this.authService.getSessionId();
    if (!sessionId) return of(null);

    return this.httpClient.delete(
      `${environment.apiBaseUrl}/list/${listId}`,
      this.getOptions({ session_id: sessionId })
    );
  }

  // 3. Получение всех кастомных списков пользователя
  getCustomLists(): Observable<any> {
    const sessionId = this.authService.getSessionId();
    if (!sessionId) return of([]);

    return this.httpClient.get(
      `${environment.apiBaseUrl}/account/${environment.accountId}/lists`,
      this.getOptions({ session_id: sessionId })
    );
  }

  // 4. Добавление фильма в кастомный список
  addMovieToCustomList(listId: number, movieId: number): Observable<any> {
    const sessionId = this.authService.getSessionId();
    if (!sessionId) return of(null);

    const body = {
      media_id: movieId,
    };

    return this.httpClient.post(
      `${environment.apiBaseUrl}/list/${listId}/add_item`,
      body,
      this.getOptions({ session_id: sessionId })
    );
  }

  // 5. Удаление фильма из кастомного списка
  removeMovieFromCustomList(listId: number, movieId: number): Observable<any> {
    const sessionId = this.authService.getSessionId();
    if (!sessionId) return of(null);

    const body = {
      media_id: movieId,
    };

    return this.httpClient.post(
      `${environment.apiBaseUrl}/list/${listId}/remove_item`,
      body,
      this.getOptions({ session_id: sessionId })
    );
  }

  // 6. Очистка кастомного списка
  clearCustomList(listId: number): Observable<any> {
    const sessionId = this.authService.getSessionId();
    if (!sessionId) return of(null);

    return this.httpClient.post(
      `${environment.apiBaseUrl}/list/${listId}/clear`,
      {},
      this.getOptions({ session_id: sessionId })
    );
  }

  // 7. Получение фильмов в кастомном списке
  getMoviesInCustomList(listId: number): Observable<Movie[]> {
    return this.httpClient
      .get<CustomListDetailsResponse>(
        `${environment.apiBaseUrl}/list/${listId}`,
        this.getOptions()
      )
      .pipe(map((response) => response.items));
  }
  //--------------------------------------
  getMovieTrailer(movieId: number): Observable<string | null> {
    return this.httpClient
      .get<{ results: Array<{ key: string; type: string }> }>(
        `${environment.apiBaseUrl}/movie/${movieId}/videos?api_key=${environment.apiKey}`
      )
      .pipe(
        map((response) => {
          const trailer = response.results.find(
            (video) => video.type === 'Trailer' && video.key
          );
          return trailer ? trailer.key : null;
        })
      );
  }
}
