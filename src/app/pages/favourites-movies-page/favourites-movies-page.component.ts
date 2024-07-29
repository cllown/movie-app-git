import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieService } from '../../services/movie/movie.service';
import { Subscription, takeUntil } from 'rxjs';
import { ClearObservable } from '../../models/clear-observable';
import { AuthService } from '../../services/auth/auth.service';

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
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {
    super();
  }

  ngOnInit() {
    this.movieService
      .getFavoritesMovies()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (results) => {
          console.log('Fetched favorite movies:', results);
          this.movies = results;
        },
        error: (error) => {
          console.error('Error fetching favorite movies:', error);
        },
      });
  }

  removeFromFavourites(id: number) {
    this.movieService
      .removeFromFavorites(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log(`Movie with ID ${id} removed from favorites`);
          this.movies = this.movies.filter((movie) => movie.id !== id);
        },
        error: (error) => {
          console.error(
            `Error removing movie with ID ${id} from favorites:`,
            error
          );
        },
      });
  }
}
