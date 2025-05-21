import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { combineLatest, map, Observable, of, switchMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllMovies, selectFilteredMovies } from '../../store/selectors';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie/movie.service';

@Component({
  selector: 'app-all-movies-page',
  standalone: true,
  imports: [MovieListComponent, CommonModule],
  templateUrl: './all-movies-page.component.html',
  styleUrl: './all-movies-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllMoviesPageComponent implements OnInit {
  allMovies$!: Observable<Movie[]>;
  recommendationMovies$!: Observable<Movie[]>;

  constructor(private store: Store, private movieService: MovieService) {}

  ngOnInit(): void {
    const filteredMovies$ = this.store.select(selectFilteredMovies);
    const allMovies$ = this.store.select(selectAllMovies);

    this.allMovies$ = combineLatest([filteredMovies$, allMovies$]).pipe(
      map(([filteredMovies, allMovies]) => {
        return filteredMovies && filteredMovies.length > 0
          ? filteredMovies
          : allMovies;
      })
    );

    this.recommendationMovies$ = this.movieService.getFavouriteMovies().pipe(
      take(1),
      map((favMovies) => favMovies.map((movie) => movie.id)),
      switchMap((favIds) => {
        if (favIds.length === 0) return of([]);
        return this.movieService.getSmartRecommendations(favIds);
      })
    );
  }
}
