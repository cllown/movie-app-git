import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Movie } from '../../models/movie';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPopularMovies } from '../../store/selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popular-movies-page',
  standalone: true,
  templateUrl: './popular-movies-page.component.html',
  styleUrls: ['./popular-movies-page.component.scss'],
  imports: [
    MovieListComponent,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopularMoviesPageComponent implements OnInit {
  popularMovies$!: Observable<Movie[] | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.popularMovies$ = this.store.select(selectPopularMovies);
  }
}
