import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { movies } from '../../mock-data/mock-movies';
import { PMovieCardComponent } from '../../components/p-movie-card/p-movie-card/p-movie-card.component';
import { MovieService } from '../../services/movie/movie.service';

@Component({
  selector: 'app-watch-list-movies-page',
  standalone: true,
  imports: [CommonModule, PMovieCardComponent],
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
