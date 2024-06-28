import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { movies } from '../../mock-data/mock-movies';
import { PMovieCardComponent } from '../../components/p-movie-card/p-movie-card/p-movie-card.component';
import { MovieService } from '../../services/movie/movie.service';

@Component({
  selector: 'app-favourites-movies-page',
  standalone: true,
  templateUrl: './favourites-movies-page.component.html',
  styleUrls: ['./favourites-movies-page.component.scss'],
  imports: [CommonModule, PMovieCardComponent],
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
