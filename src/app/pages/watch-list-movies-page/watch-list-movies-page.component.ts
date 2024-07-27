import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieService } from '../../services/movie/movie.service';
import { ClearObservable } from '../../models/clear-observable';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-watch-list-movies-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './watch-list-movies-page.component.html',
  styleUrl: './watch-list-movies-page.component.scss',
})
export class WatchListMoviesPageComponent extends ClearObservable implements OnInit {
  watchList: Movie[] = [];

  constructor(private movieService: MovieService) {
    super();
  }

  ngOnInit() {
    this.movieService.watchList$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.watchList = data;
    });
  }

  removeFromWatchList(movie: Movie) {
    this.movieService.removeFromWatchList(movie);
  }
}
