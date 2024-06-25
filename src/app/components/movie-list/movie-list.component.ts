import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { movies } from '../../mock-data/mock-movies';
import { PMovieCardComponent } from "../p-movie-card/p-movie-card/p-movie-card.component";

@Component({
    selector: 'app-movie-list',
    standalone: true,
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss'],
    imports: [CommonModule, PMovieCardComponent]
})
export class MovieListComponent {
  public readonly movies = movies;
  favourites: Movie[] = [];
  watchList: Movie[] = [];

  @Output() favouritesChange = new EventEmitter<Movie[]>();
  @Output() watchListChange = new EventEmitter<Movie[]>();

  onAddToFavourites(movie: Movie) {
    if (!this.isInArray(this.favourites, movie)) {
      this.favourites.push(movie);
      this.favouritesChange.emit(this.favourites);
    }
  }

  onAddToWatchList(movie: Movie) {
    if (!this.isInArray(this.watchList, movie)) {
      this.watchList.push(movie);
      this.watchListChange.emit(this.watchList);
    }
  }

  onRemoveFromFavourites(movie: Movie) {
    this.favourites = this.favourites.filter((item) => item.id !== movie.id);
    this.favouritesChange.emit(this.favourites);
  }

  onRemoveFromWatchList(movie: Movie) {
    this.watchList = this.watchList.filter((item) => item.id !== movie.id);
    this.watchListChange.emit(this.watchList);
  }

  private isInArray(array: Movie[], movie: Movie): boolean {
    return array.some((item) => item.id === movie.id);
  }

  trackById(item: any): number {
    return item.id;
  }
}
