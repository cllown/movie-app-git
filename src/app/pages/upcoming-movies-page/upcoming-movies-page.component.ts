import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Movie } from '../../models/movie';
import { takeUntil } from 'rxjs';
import { ClearObservable } from '../../models/clear-observable';
import { Store } from '@ngrx/store';
import { selectUpcomingMovies } from '../../store/selectors';

@Component({
  selector: 'app-upcoming-movies-page',
  standalone: true,
  templateUrl: './upcoming-movies-page.component.html',
  styleUrl: './upcoming-movies-page.component.scss',
  imports: [RouterModule, MovieListComponent],
})
export class UpcomingMoviesPageComponent extends ClearObservable implements OnInit {
  upcomingMovies: Movie[] | null = [];

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    this.store
    .select(selectUpcomingMovies)
    .pipe(takeUntil(this.destroy$))
    .subscribe((movies) => {
      this.upcomingMovies = movies || null;
    });
  }
}
