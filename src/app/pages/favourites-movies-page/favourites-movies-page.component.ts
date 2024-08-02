import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { takeUntil } from 'rxjs';
import { ClearObservable } from '../../models/clear-observable';
import { selectFavouriteMovies } from '../../store/selectors';
import { Store } from '@ngrx/store';
import { removeMovieFromFavourites } from '../../store/actions';

@Component({
  selector: 'app-favourites-movies-page',
  standalone: true,
  templateUrl: './favourites-movies-page.component.html',
  styleUrls: ['./favourites-movies-page.component.scss'],
  imports: [CommonModule, MovieCardComponent],
})
export class FavouritesMoviesPageComponent
  extends ClearObservable
  implements OnInit
{
  movies: Movie[] | null = [];

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    this.store
      .select(selectFavouriteMovies)
      .pipe(takeUntil(this.destroy$))
      .subscribe((movies) => {
        this.movies = movies || null;
      });
  }

  removeFromFavourites(movieId: number) {
    this.store.dispatch(removeMovieFromFavourites({ movieId }));
  }
}
