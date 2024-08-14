import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Store } from '@ngrx/store';
import { selectWatchListMovies } from '../../store/selectors';
import { removeMovieFromWatchList } from '../../store/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-watch-list-movies-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './watch-list-movies-page.component.html',
  styleUrl: './watch-list-movies-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchListMoviesPageComponent implements OnInit {
  movies$!: Observable<Movie[] | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.movies$ = this.store.select(selectWatchListMovies);
  }

  removeFromWatchList(movieId: number) {
    this.store.dispatch(removeMovieFromWatchList({ movieId }));
  }
}
