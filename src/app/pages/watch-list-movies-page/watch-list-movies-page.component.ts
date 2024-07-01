import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { MovieCardComponent } from '../../components/movie-card/movie-card/movie-card.component';
import { MovieService } from '../../services/movie/movie.service';

@Component({
  selector: 'app-watch-list-movies-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './watch-list-movies-page.component.html',
  styleUrl: './watch-list-movies-page.component.scss',
})
export class WatchListMoviesPageComponent implements OnInit {
  watchList: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.watchList = this.movieService.getWatchList();
  }

  removeFromWatchList(movie: Movie) {
    this.movieService.removeFromWatchList(movie);
    this.watchList = this.movieService.getWatchList();
  }
}
