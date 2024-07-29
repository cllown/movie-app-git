import { Injectable } from '@angular/core';
import { Movie, MovieApiModel } from '../../models/movie';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';
import { MovieListResponse } from '../../models/responce.inetrface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  apiKey = '?api_key=8a701f184202b480bd359829ea7c74cb';
  baseApiUrl = 'https://api.themoviedb.org/3';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getPopularMovies(): Observable<MovieApiModel> {
    return this.httpClient.get<MovieApiModel>(
      `${this.baseApiUrl}/movie/popular${this.apiKey}`
    );
  }

  getTopRatedMovies(): Observable<MovieApiModel> {
    return this.httpClient.get<MovieApiModel>(
      `${this.baseApiUrl}/movie/top_rated${this.apiKey}`
    );
  }

  getNowPlayingMovies(): Observable<MovieApiModel> {
    return this.httpClient.get<MovieApiModel>(
      `${this.baseApiUrl}/movie/now_playing${this.apiKey}`
    );
  }

  getUpcomingMovies(): Observable<MovieApiModel> {
    return this.httpClient.get<MovieApiModel>(
      `${this.baseApiUrl}/movie/upcoming${this.apiKey}`
    );
  }

  getMovieDetails(movieId: number): Observable<Movie> {
    return this.httpClient.get<Movie>(
      `${this.baseApiUrl}/movie/${movieId}${this.apiKey}`
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

  updateFavorites(id: number) {
    console.log('Updating favorites with movie ID:', id);
    return this.updateList('favorite', id, true).subscribe({
      next: () => {
        console.log(`Movie ID ${id} added to favorites`);
      },
      error: (error) => {
        console.error('Error adding to favorites:', error);
      },
    });
  }

  updateWatchlist(id: number) {
    console.log('Updating watchlist with movie ID:', id);
    return this.updateList('watchlist', id, true).subscribe({
      next: () => {
        console.log(`Movie ID ${id} added to watchlist`);
      },
      error: (error) => {
        console.error('Error adding to watchlist:', error);
      },
    });
  }

  removeFromWatchlist(id: number) {
    return this.updateList('watchlist', id, false);
  }

  getWatchlistMovies() {
    const sessionId = this.authService.getSessionId();
    if (sessionId) {
      const params: Record<string, string> = { session_id: sessionId };
      console.log('Fetching watchlist movies with session ID:', sessionId);
      return this.httpClient
        .get<MovieListResponse>(
          `${environment.apiBaseUrl}/account/${environment.accountId}/watchlist/movies`,
          this.getOptions(params)
        )
        .pipe(map((response) => response.results));
    }
    console.log('No session ID available');
    return of([]);
  }

  removeFromFavorites(id: number) {
    return this.updateList('favorite', id, false);
  }

  getFavoritesMovies() {
    const sessionId = this.authService.getSessionId();
    if (sessionId) {
      const params: Record<string, string> = { session_id: sessionId };
      console.log('Fetching favorite movies with session ID:', sessionId);
      return this.httpClient
        .get<MovieListResponse>(
          `${environment.apiBaseUrl}/account/${environment.accountId}/favorite/movies`,
          this.getOptions(params)
        )
        .pipe(map((response) => response.results));
    }
    console.log('No session ID available');
    return of([]);
  }
}
