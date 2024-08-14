import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { selectFavouriteMovies } from '../../store/selectors';
import { Store } from '@ngrx/store';
import { removeMovieFromFavourites } from '../../store/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favourites-movies-page',
  standalone: true,
  templateUrl: './favourites-movies-page.component.html',
  styleUrls: ['./favourites-movies-page.component.scss'],
  imports: [CommonModule, MovieCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavouritesMoviesPageComponent implements OnInit {
  movies$!: Observable<Movie[] | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.movies$ = this.store.select(selectFavouriteMovies);
  }

  removeFromFavourites(movieId: number) {
    this.store.dispatch(removeMovieFromFavourites({ movieId }));
  }
}
