import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { movies } from '../../mock-data/mock-movies';
import { PMovieCardComponent } from '../../components/p-movie-card/p-movie-card/p-movie-card.component';

@Component({
  selector: 'app-favourites-movies-page',
  standalone: true,
  templateUrl: './favourites-movies-page.component.html',
  styleUrls: ['./favourites-movies-page.component.scss'],
  imports: [CommonModule, PMovieCardComponent],
})
export class FavouritesMoviesPageComponent implements OnInit {
  favouriteMovies: Movie[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const dataString = params['data'];
      if (dataString) {
        const favouriteMovieIds: string[] = JSON.parse(dataString);
        this.favouriteMovies = movies.filter((movie) =>
          favouriteMovieIds.includes(movie.id.toString())
        );
      }
    });
  }
  removeFromFavourites(movie: Movie) {
    this.favouriteMovies = this.favouriteMovies.filter(
      (m) => m.id !== movie.id
    );
  }

  trackById(index: number, item: Movie): number {
    return item.id;
  }
}
