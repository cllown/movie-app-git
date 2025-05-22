import { Injectable } from '@angular/core';
import { Genre, Movie, MovieApiModel } from '../../models/movie';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
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
  private cache = new Map<string, any>(); // Кеш для запитів до API

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private store: Store
  ) {}

  // Метод для перевірки кешу або отримання нових даних
  private getCachedData<T>(
    url: string,
    params?: Record<string, string>
  ): Observable<T> {
    const fullUrl = this.constructFullUrl(url, params);

    if (this.cache.has(fullUrl)) {
      return of(this.cache.get(fullUrl)! as T); // Повертаємо з кешу
    } else {
      return this.httpClient
        .get<T>(fullUrl)
        .pipe(tap((data) => this.cache.set(fullUrl, data))); // Запит і збереження в кеш
    }
  }

  // Метод для створення повного URL з параметрами
  private constructFullUrl(
    url: string,
    params?: Record<string, string>
  ): string {
    if (!params) return url;

    const queryParams = new URLSearchParams(params).toString();
    return `${url}?${queryParams}`;
  }

  // Отримання популярних фільмів
  getPopularMovies(): Observable<MovieApiModel> {
    return this.getCachedData(
      `${environment.apiBaseUrl}/movie/popular?api_key=${environment.apiKey}`
    );
  }

  // Найкраще оцінені фільми
  getTopRatedMovies(): Observable<MovieApiModel> {
    return this.getCachedData(
      `${environment.apiBaseUrl}/movie/top_rated?api_key=${environment.apiKey}`
    );
  }

  // Зараз у кінотеатрах
  getNowPlayingMovies(): Observable<MovieApiModel> {
    return this.getCachedData(
      `${environment.apiBaseUrl}/movie/now_playing?api_key=${environment.apiKey}`
    );
  }

  // Майбутні релізи
  getUpcomingMovies(): Observable<MovieApiModel> {
    return this.getCachedData(
      `${environment.apiBaseUrl}/movie/upcoming?api_key=${environment.apiKey}`
    );
  }

  // Рекомендації до певного фільму
  getRecommendationForMovie(movieId: number): Observable<MovieApiModel> {
    return this.getCachedData(
      `${environment.apiBaseUrl}/movie/${movieId}/recommendations?api_key=${environment.apiKey}`
    );
  }

  // Розумні рекомендації на основі улюблених фільмів користувача
  getSmartRecommendations(userLikedMovies: number[]): Observable<Movie[]> {
    const requests$ = userLikedMovies.map((id) =>
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

        return Array.from(uniqueMoviesMap.values()); // Видаляємо дублікати
      })
    );
  }

  // Персональні рекомендації
  getPersonalRecommendations(): Observable<Movie[]> {
    return this.getFavouriteMovies().pipe(
      map((favourites) => favourites.map((movie) => movie.id)),
      switchMap((ids) =>
        ids.length ? this.getSmartRecommendations(ids) : of([])
      )
    );
  }

  // Детальна інформація про фільм
  getMovieDetails(movieId: number): Observable<Movie> {
    return this.getCachedData(
      `${environment.apiBaseUrl}/movie/${movieId}?api_key=${environment.apiKey}`
    );
  }

  // Пошук фільмів за параметрами
  getMoviesByParams(params: Record<string, string>): Observable<MovieApiModel> {
    return this.httpClient.get<MovieApiModel>(
      `${environment.apiBaseUrl}/discover/movie`,
      this.getOptions(params)
    );
  }

  // Пошук фільмів за жанрами
  getMoviesByGenres(genres: number[]): Observable<MovieApiModel> {
    return this.getMoviesByParams({ with_genres: genres.join(',') });
  }

  // Пошук фільмів за рейтингом
  getMoviesByRating(rating: number): Observable<MovieApiModel> {
    return this.getMoviesByParams({ 'vote_average.gte': rating.toString() });
  }

  // Отримання списку жанрів
  getGenres() {
    return this.httpClient.get<{ genres: Genre[] }>(
      `${environment.apiBaseUrl}/genre/movie/list?api_key=${environment.apiKey}`
    );
  }

  // Формування параметрів для запиту
  private getOptions(params: Record<string, string> = {}): {
    params: HttpParams;
  } {
    return {
      params: new HttpParams({
        fromObject: { ...params, api_key: environment.apiKey },
      }),
    };
  }

  // Пошук фільмів по жанрам для розумних рекомундацій по настрою
  getMoodBasedRecommendations(genres: number[]): Observable<Movie[]> {
    const randomPage = Math.floor(Math.random() * 10) + 1;

    return this.getMoviesByParams({
      with_genres: genres.join(','),
      page: randomPage.toString(),
    }).pipe(map((res) => res.results.slice(0, 3)));
  }

  // Додавання або видалення фільму з улюблених / списку перегляду
  updateList(listType: string, id: number, isAdding: boolean): Observable<any> {
    const sessionId = this.authService.getSessionId();
    if (!sessionId) return of([]);

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

  // Улюблені фільми
  getFavouriteMovies() {
    const sessionId = this.authService.getSessionId();
    if (sessionId) {
      return this.httpClient
        .get<MovieListResponse>(
          `${environment.apiBaseUrl}/account/${environment.accountId}/favorite/movies`,
          this.getOptions({ session_id: sessionId })
        )
        .pipe(map((response) => response.results));
    }
    return of([]);
  }

  // Список для перегляду
  getWatchListMovies() {
    const sessionId = this.authService.getSessionId();
    if (sessionId) {
      return this.httpClient
        .get<MovieListResponse>(
          `${environment.apiBaseUrl}/account/${environment.accountId}/watchlist/movies`,
          this.getOptions({ session_id: sessionId })
        )
        .pipe(map((response) => response.results));
    }
    return of([]);
  }

  // Пошук фільмів за ключовим словом
  searchMovies(query: string): Observable<Movie[]> {
    return this.httpClient
      .get<{ results: Movie[] }>(
        `${environment.apiBaseUrl}/search/movie?api_key=${environment.apiKey}&query=${query}`
      )
      .pipe(map((response) => response.results));
  }

  // Отримання назв жанрів за їх ідентифікаторами
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

  // Перевірка, чи є фільм у списку
  checkIfMovieInList(
    movieId: number,
    list$: Observable<Movie[] | null>
  ): Observable<boolean> {
    return list$.pipe(
      map((movies) => movies?.some((movie) => movie.id === movieId) || false)
    );
  }

  //================ Кастомні списки =====================//

  // Створення кастомного списку
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

  // Видалення кастомного списку
  deleteCustomList(listId: number): Observable<any> {
    const sessionId = this.authService.getSessionId();
    if (!sessionId) return of(null);

    return this.httpClient.delete(
      `${environment.apiBaseUrl}/list/${listId}`,
      this.getOptions({ session_id: sessionId })
    );
  }

  // Отримання всіх кастомних списків
  getCustomLists(): Observable<any> {
    const sessionId = this.authService.getSessionId();
    if (!sessionId) return of([]);

    return this.httpClient.get(
      `${environment.apiBaseUrl}/account/${environment.accountId}/lists`,
      this.getOptions({ session_id: sessionId })
    );
  }

  // Додавання фільму до кастомного списку
  addMovieToCustomList(listId: number, movieId: number): Observable<any> {
    const sessionId = this.authService.getSessionId();
    if (!sessionId) return of(null);

    return this.httpClient.post(
      `${environment.apiBaseUrl}/list/${listId}/add_item`,
      { media_id: movieId },
      this.getOptions({ session_id: sessionId })
    );
  }

  // Видалення фільму з кастомного списку
  removeMovieFromCustomList(listId: number, movieId: number): Observable<any> {
    const sessionId = this.authService.getSessionId();
    if (!sessionId) return of(null);

    return this.httpClient.post(
      `${environment.apiBaseUrl}/list/${listId}/remove_item`,
      { media_id: movieId },
      this.getOptions({ session_id: sessionId })
    );
  }

  // Очищення кастомного списку
  clearCustomList(listId: number): Observable<any> {
    const sessionId = this.authService.getSessionId();
    if (!sessionId) return of(null);

    return this.httpClient.post(
      `${environment.apiBaseUrl}/list/${listId}/clear`,
      {},
      this.getOptions({ session_id: sessionId })
    );
  }

  // Отримання фільмів з кастомного списку
  getMoviesInCustomList(listId: number): Observable<Movie[]> {
    return this.httpClient
      .get<CustomListDetailsResponse>(
        `${environment.apiBaseUrl}/list/${listId}`,
        this.getOptions()
      )
      .pipe(map((response) => response.items));
  }

  // Отримання трейлеру фільму
  getMovieTrailer(movieId: number): Observable<string | null> {
    return this.httpClient
      .get<{ results: Array<{ key: string; type: string }> }>(
        `${environment.apiBaseUrl}/movie/${movieId}/videos?api_key=${environment.apiKey}`
      )
      .pipe(
        map((response) => {
          const trailer = response.results.find(
            (video) => video.type === 'Trailer'
          );
          return trailer ? trailer.key : null;
        })
      );
  }
}
