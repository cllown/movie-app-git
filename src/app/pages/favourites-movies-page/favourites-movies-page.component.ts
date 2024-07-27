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
    // this.movieService.favouriteList$.pipe(takeUntil(this.destroy$)).subscribe(data => {
    //   this.favourites = data;
    // });
    this.movieService.getFavouritesMovies().pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.favourites = data.results;
    });
  }

  removeFromFavourites(movie: Movie) {
    this.movieService.removeFromFavourites(movie);
  }
}
