import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { MovieCardComponent } from '../../components/movie-card/movie-card/movie-card.component';
import { MovieService } from '../../services/movie/movie.service';

@Component({
  selector: 'app-favourites-movies-page',
  standalone: true,
  templateUrl: './favourites-movies-page.component.html',
  styleUrls: ['./favourites-movies-page.component.scss'],
  imports: [CommonModule, MovieCardComponent],
})
export class FavouritesMoviesPageComponent implements OnInit {
  favourites: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.favourites = this.movieService.getFavouritesMovies();
  }

  removeFromFavourites(movie: Movie) {
    this.movieService.removeFromFavourites(movie);
    this.favourites = this.movieService.getFavouritesMovies();
  }
}
