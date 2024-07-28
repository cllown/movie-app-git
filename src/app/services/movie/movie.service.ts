import { Injectable } from '@angular/core';
import { Movie, MovieApiModel } from '../../models/movie';
import { BehaviorSubject, catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  apiKey = '?api_key=8a701f184202b480bd359829ea7c74cb';
  baseApiUrl = 'https://api.themoviedb.org/3/movie';

  accountId: number | null = null;
  watchList: Movie[] = [];

  watchLaterMovies$ = new BehaviorSubject<Movie[]>([]);
  public watchList$ = this.watchLaterMovies$;

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  setAccountId(id: number) {
    this.accountId = id;
  }

  getPopularMovies(): Observable<MovieApiModel> {
    return this.httpClient.get<MovieApiModel>(
      `${this.baseApiUrl}/popular${this.apiKey}`
    );
  }

  getTopRatedMovies(): Observable<MovieApiModel> {
    return this.httpClient.get<MovieApiModel>(
      `${this.baseApiUrl}/top_rated${this.apiKey}`
    );
  }

  getNowPlayingMovies(): Observable<MovieApiModel> {
    return this.httpClient.get<MovieApiModel>(
      `${this.baseApiUrl}/now_playing${this.apiKey}`
    );
  }

  getUpcomingMovies(): Observable<MovieApiModel> {
    return this.httpClient.get<MovieApiModel>(
      `${this.baseApiUrl}/upcoming${this.apiKey}`
    );
  }

  getMovieDetails(movieId: number): Observable<Movie> {
    return this.httpClient.get<Movie>(
      `${this.baseApiUrl}/${movieId}${this.apiKey}`
    );
  }

  setFavouriteMovie(movieId: number): Observable<{ status_code: number; status_message: string; }> {
    const sessionId = this.authService.getSessionId();
    if (!sessionId) {
      throw new Error('Session ID is not available');
    }
    const body = {
      media_type: 'movie',
      media_id: movieId,
      favorite: true
    };
    return this.httpClient.post<{ status_code: number; status_message: string; }>(
      `https://api.themoviedb.org/3/account/${this.accountId}/favorite${this.apiKey}&session_id=${sessionId}`,
      body
    );
  }

  getFavouritesMovies(): Observable<MovieApiModel> {
    const sessionId = this.authService.getSessionId();
    if (!sessionId) {
      throw new Error('Session ID is not available');
    }
    return this.httpClient.get<MovieApiModel>(
      `https://api.themoviedb.org/3/account/${this.accountId}/favorite/movies${this.apiKey}&session_id=${sessionId}`
    ).pipe(
      tap(response => console.log('Favourite Movies:', response.results)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  removeFromFavourites(movieId: number): Observable<{status_code: number; status_message: string}> {
    const sessionId = this.authService.getSessionId();
    if (!sessionId) {
      throw new Error('Session ID is not available');
    }
    const body = {
      media_type: 'movie',
      media_id: movieId,
      favorite: false
    };
    return this.httpClient.post<{status_code: number; status_message: string}>(
      `https://api.themoviedb.org/3/account/${this.accountId}/favorite?api_key=${this.apiKey}&session_id=${sessionId}`,
      body
    );
  }

  setWatchLaterMovie(movie: Movie) {
    if (!this.watchList.includes(movie)) {
      this.watchList.push(movie);
      this.watchLaterMovies$.next(this.watchList);
    }
  }

  removeFromWatchList(movie: Movie) {
    this.watchList = this.watchList.filter((item) => item.id !== movie.id);
    this.watchLaterMovies$.next(this.watchList);
  }
}
