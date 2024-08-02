import { Injectable } from '@angular/core';
import { Movie, MovieApiModel } from '../../models/movie';
import { map, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';
import { MovieListResponse } from '../../models/responce.inetrface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getPopularMovies(): Observable<MovieApiModel> {
    return this.httpClient.get<MovieApiModel>(
      `${environment.apiBaseUrl}/movie/popular?api_key=${environment.apiKey}`
    );
  }

  getTopRatedMovies(): Observable<MovieApiModel> {
    return this.httpClient.get<MovieApiModel>(
      `${environment.apiBaseUrl}/movie/top_rated?api_key=${environment.apiKey}`
    );
  }

  getNowPlayingMovies(): Observable<MovieApiModel> {
    return this.httpClient.get<MovieApiModel>(
      `${environment.apiBaseUrl}/movie/now_playing?api_key=${environment.apiKey}`
    );
  }

  getUpcomingMovies(): Observable<MovieApiModel> {
    return this.httpClient.get<MovieApiModel>(
      `${environment.apiBaseUrl}/movie/upcoming?api_key=${environment.apiKey}`
    );
  }

  getMovieDetails(movieId: number): Observable<Movie> {
    return this.httpClient.get<Movie>(
      `${environment.apiBaseUrl}/movie/${movieId}?api_key=${environment.apiKey}`
    );
  }

  private getOptions(params: Record<string, string> = {}): {
    params: HttpParams;
  } {
    const accessParams = { api_key: environment.apiKey };
    const allParams = { ...accessParams, ...params };
    const httpParams = new HttpParams({ fromObject: allParams });
    return { params: httpParams };
  }

  updateList(listType: string, id: number, isAdding: boolean) {
    const body = {
      media_type: 'movie',
      media_id: id,
      [listType]: isAdding,
    };
    const sessionId = this.authService.getSessionId();
    if (sessionId) {
      const params: Record<string, string> = { session_id: sessionId };
      return this.httpClient.post(
        `${environment.apiBaseUrl}/account/${environment.accountId}/${listType}`,
        body,
        this.getOptions(params)
      );
    }
    return of([]);
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
}
