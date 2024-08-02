import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Movie } from '../../models/movie';
import { takeUntil } from 'rxjs';
import { ClearObservable } from '../../models/clear-observable';
import { Store } from '@ngrx/store';
import { selectTopRatedMovies } from '../../store/selectors';

@Component({
  selector: 'app-top-rated-movies-page',
  standalone: true,
  templateUrl: './top-rated-movies-page.component.html',
  styleUrl: './top-rated-movies-page.component.scss',
  imports: [RouterModule, MovieListComponent],
})
export class TopRatedMoviesPageComponent extends ClearObservable implements OnInit {
  topRatedMovies: Movie[] | null = [];

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    this.store
    .select(selectTopRatedMovies)
    .pipe(takeUntil(this.destroy$))
    .subscribe((movies) => {
      this.topRatedMovies = movies || null;
    });
  }
}
