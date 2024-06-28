import { Injectable } from '@angular/core';
import { movies } from '../../mock-data/mock-movies';
import { Movie } from '../../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  favourites: Movie[] = [];
  watchList: Movie[] = [];

  constructor() {}

  getAllMovies() {
    return movies;
  }

  getPopularMovies() {
    return movies.filter((movie) => movie.popularity > 5000);
  }

  getTopRatedMoviesSortedByRating() {
    return [...movies].sort(
      (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
    );
  }

  getNowPlayingMovies() {
    const currentDate = new Date();
    return movies.filter(
      (movie) => new Date(movie.release_date) <= currentDate
    );
  }

  getUpcomingMovies() {
    const currentDate = new Date();
    return movies.filter((movie) => new Date(movie.release_date) > currentDate);
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
