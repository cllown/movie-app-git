import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Movie } from '../../models/movie';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUpcomingMovies } from '../../store/selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upcoming-movies-page',
  standalone: true,
  templateUrl: './upcoming-movies-page.component.html',
  styleUrl: './upcoming-movies-page.component.scss',
  imports: [MovieListComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpcomingMoviesPageComponent implements OnInit {
  upcomingMovies$!: Observable<Movie[] | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.upcomingMovies$ = this.store.select(selectUpcomingMovies);
  }
}
