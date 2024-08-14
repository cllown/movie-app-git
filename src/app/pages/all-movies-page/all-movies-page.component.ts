import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { combineLatest, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllMovies, selectFilteredMovies } from '../../store/selectors';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-movies-page',
  standalone: true,
  imports: [MovieListComponent, CommonModule],
  templateUrl: './all-movies-page.component.html',
  styleUrl: './all-movies-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllMoviesPageComponent implements OnInit {
  movies$!: Observable<Movie[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    const filteredMovies$ = this.store.select(selectFilteredMovies);
    const allMovies$ = this.store.select(selectAllMovies);

    this.movies$ = combineLatest([filteredMovies$, allMovies$]).pipe(
      map(([filteredMovies, allMovies]) => {
        return filteredMovies && filteredMovies.length > 0
          ? filteredMovies
          : allMovies;
      })
    );
  }
}
