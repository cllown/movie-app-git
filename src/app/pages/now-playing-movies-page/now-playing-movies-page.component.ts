import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Movie } from '../../models/movie';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { takeUntil } from 'rxjs';
import { ClearObservable } from '../../models/clear-observable';
import { Store } from '@ngrx/store';
import { selectNowPlayingMovies } from '../../store/selectors';

@Component({
  selector: 'app-now-playing-movies-page',
  standalone: true,
  templateUrl: './now-playing-movies-page.component.html',
  styleUrl: './now-playing-movies-page.component.scss',
  imports: [RouterModule, MovieListComponent],
})
export class NowPlayingMoviesPageComponent extends ClearObservable implements OnInit {
  nowPlayingMovies: Movie[] | null = [];

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    this.store
      .select(selectNowPlayingMovies)
      .pipe(takeUntil(this.destroy$))
      .subscribe((movies) => {
        this.nowPlayingMovies = movies || null;
      });
  }
}
