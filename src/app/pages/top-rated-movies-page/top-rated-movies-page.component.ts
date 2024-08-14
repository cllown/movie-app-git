import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Movie } from '../../models/movie';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { selectTopRatedMovies } from '../../store/selectors';

@Component({
  selector: 'app-top-rated-movies-page',
  standalone: true,
  templateUrl: './top-rated-movies-page.component.html',
  styleUrl: './top-rated-movies-page.component.scss',
  imports: [MovieListComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopRatedMoviesPageComponent implements OnInit {
  topRatedMovies$!: Observable<Movie[] | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.topRatedMovies$ = this.store.select(selectTopRatedMovies);
  }
}
