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
export class WatchListMoviesPageComponent
  extends ClearObservable
  implements OnInit
{
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {
    super();
  }

  ngOnInit() {
    this.movieService
      .getWatchlistMovies()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (results) => {
          console.log('Fetched watchlist movies:', results);
          this.movies = results;
        },
        error: (error) => {
          console.error('Error fetching watchlist movies:', error);
        },
      });
  }

  removeFromWatchList(id: number) {
    this.movieService
      .removeFromWatchlist(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log(`Movie with ID ${id} removed from watchlist`);
          this.movies = this.movies.filter((movie) => movie.id !== id);
        },
        error: (error) => {
          console.error(
            `Error removing movie with ID ${id} from watchlist:`,
            error
          );
        },
      });
  }
}
