import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectNowPlayingMovies } from '../../store/selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-now-playing-movies-page',
  standalone: true,
  templateUrl: './now-playing-movies-page.component.html',
  styleUrl: './now-playing-movies-page.component.scss',
  imports: [MovieListComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlayingMoviesPageComponent implements OnInit {
  nowPlayingMovies$!: Observable<Movie[] | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.nowPlayingMovies$ = this.store.select(selectNowPlayingMovies);
  }
}
