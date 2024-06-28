import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { PMovieCardComponent } from '../p-movie-card/p-movie-card/p-movie-card.component';
import { MovieService } from '../../services/movie/movie.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  imports: [CommonModule, PMovieCardComponent],
})
export class MovieListComponent {
  @Input() movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  onAddToFavourites(movie: Movie) {
    this.movieService.addToFavourites(movie);
  }

  onAddToWatchList(movie: Movie) {
    this.movieService.addToWatchList(movie);
  }
}
