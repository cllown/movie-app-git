import { Injectable } from '@angular/core';
import { Movie, MovieApiModel } from '../../models/movie';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  apiKey = '?api_key=8a701f184202b480bd359829ea7c74cb';
  baseApiUrl = 'https://api.themoviedb.org/3/movie';

  accountId: number | null = null;
  favourites: Movie[] = [];
  watchList: Movie[] = [];

  favouriteMovies$ = new BehaviorSubject<Movie[]>([]);
  public favouriteList$ = this.favouriteMovies$;

  watchLaterMovies$ = new BehaviorSubject<Movie[]>([]);
  public watchList$ = this.watchLaterMovies$;

  constructor(private httpClient: HttpClient) {}

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

  /*
    if (!this.favourites.includes(movie)) {
      return this.httpClient.post<Movie>(
      `${this.baseApiUrl}/account/${this.accountId}/favorite?api_key=${this.apiKey}`, movie 
      );
    }
  */
  setFavouriteMovie(movie: Movie): Observable<Movie> | void {
    return this.httpClient.post<Movie>(
      `https://api.themoviedb.org/3/account/${this.accountId}/favorite?api_key=${this.apiKey}`, movie 
    );
  }

  getFavouritesMovies(){
    return this.httpClient.get<MovieApiModel>(
      `https://api.themoviedb.org/3/account/${this.accountId}/favorite/movies${this.apiKey}`
    );
  }

  removeFromFavourites(movie: Movie) {
    this.favourites = this.favourites.filter((item) => item.id !== movie.id);
    this.favouriteMovies$.next(this.favourites);
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
