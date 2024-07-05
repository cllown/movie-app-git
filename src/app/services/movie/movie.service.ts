import { Injectable } from '@angular/core';
import { Movie, MovieApiModel } from '../../models/movie';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  apiKey = '?api_key=a66e14aac3918847e798bf6247df6743';
  baseApiUrl = 'https://api.themoviedb.org/3/movie';

  favourites: Movie[] = [];
  watchList: Movie[] = [];

  constructor(private httpClient: HttpClient) {}

  getPopularMovies(): Observable<MovieApiModel> {
   return this.httpClient.get<MovieApiModel>(`${this.baseApiUrl}/popular${this.apiKey}`);
  }

  getTopRatedMovies(): Observable<MovieApiModel> {
    return this.httpClient.get<MovieApiModel>(`${this.baseApiUrl}/top_rated${this.apiKey}`);
   }

  getNowPlayingMovies(): Observable<MovieApiModel> {
    return this.httpClient.get<MovieApiModel>(`${this.baseApiUrl}/now_playing${this.apiKey}`);
   }

  getUpcomingMovies(): Observable<MovieApiModel> {
    return this.httpClient.get<MovieApiModel>(`${this.baseApiUrl}/upcoming${this.apiKey}`);
   }
   
   getMovieDetails(movieId: number): Observable<Movie> {
    return this.httpClient.get<Movie>(`${this.baseApiUrl}/${movieId}${this.apiKey}`);
  }

  getFavouritesMovies() {
    return this.favourites;
  }

  getWatchList() {
    return this.watchList;
  }

  addToFavourites(movie: Movie) {
    if (!this.favourites.includes(movie)) {
      this.favourites.push(movie);
    }
  }

  addToWatchList(movie: Movie) {
    if (!this.watchList.includes(movie)) {
      this.watchList.push(movie);
    }
  }

  removeFromFavourites(movie: Movie) {
    this.favourites = this.favourites.filter((item) => item.id !== movie.id);
  }

  removeFromWatchList(movie: Movie) {
    this.watchList = this.watchList.filter((item) => item.id !== movie.id);
  }
}
