import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { movies } from '../../../assets/movies';
import { PMovieCardComponent } from "../p-movie-card/p-movie-card/p-movie-card.component";

@Component({
    selector: 'app-movie-list',
    standalone: true,
    templateUrl: './movie-list.component.html',
    styleUrl: './movie-list.component.scss',
    imports: [CommonModule, PMovieCardComponent]
})
export class MovieListComponent {
  public readonly movies = movies;
  favourites: Movie[] = [];
  watchList: Movie[] = [];

  onAddToFavourites(movie: Movie) {
    if (!this.isInArray(this.favourites, movie)) {
      this.favourites.push(movie);
    }
  }

  onAddToWatchList(movie: Movie) {
    if (!this.isInArray(this.watchList, movie)) {
      this.watchList.push(movie);
    }
  }

  onRemoveFromFavourites(movie: Movie) {
    this.favourites = this.favourites.filter((item) => item.id !== movie.id);
  }

  onRemoveFromWatchList(movie: Movie) {
    this.watchList = this.watchList.filter((item) => item.id !== movie.id);
  }

  private isInArray(array: Movie[], movie: Movie): boolean {
    return array.some((item) => item.id === movie.id);
  }

  trackById(item: any): number {
    return item.id;
  }
}
