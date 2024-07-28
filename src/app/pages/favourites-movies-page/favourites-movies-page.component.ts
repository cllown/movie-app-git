import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieService } from '../../services/movie/movie.service';
import { takeUntil } from 'rxjs';
import { ClearObservable } from '../../models/clear-observable';

@Component({
  selector: 'app-favourites-movies-page',
  standalone: true,
  templateUrl: './favourites-movies-page.component.html',
  styleUrls: ['./favourites-movies-page.component.scss'],
  imports: [CommonModule, MovieCardComponent],
})
export class FavouritesMoviesPageComponent extends ClearObservable implements OnInit {
  favourites: Movie[] = [];

  constructor(private movieService: MovieService) {
    super();
  }

  ngOnInit() {
    this.movieService.getFavouritesMovies().subscribe(
      movies => {
        this.favourites = movies.results;
        console.log('Favourite movies:', this.favourites);
      },
      error => {
        console.error('Failed to load favourite movies:', error);
      }
    );
    console.log(this.favourites);
  }
  removeFromFavourites(movieId: number) {
    this.movieService.removeFromFavourites(movieId).subscribe(
      response => {
        console.log('Movie removed from favourites:', response);
      },
      error => {
        console.error('Failed to remove movie from favourites:', error);
      }
    );
  }
}
