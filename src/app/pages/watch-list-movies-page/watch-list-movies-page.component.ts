import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { ClearObservable } from '../../models/clear-observable';
import { takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectWatchListMovies } from '../../store/selectors';
import { removeMovieFromWatchList } from '../../store/actions';

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
  movies: Movie[] | null = [];

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    this.store
    .select(selectWatchListMovies)
    .pipe(takeUntil(this.destroy$))
    .subscribe((movies) => {
      this.movies = movies || null;
    });
  }

  removeFromWatchList(movieId: number) {
    this.store.dispatch(removeMovieFromWatchList({ movieId }));
  }
}
