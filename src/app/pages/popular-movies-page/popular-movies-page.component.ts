import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-popular-movies-page',
  standalone: true,
  templateUrl: './popular-movies-page.component.html',
  styleUrls: ['./popular-movies-page.component.scss'],
  imports: [HeaderComponent, RouterLink, RouterModule, MovieListComponent],
})
export class PopularMoviesPageComponent implements OnInit {
  constructor(private router: Router) {}

  favoriteMovieListIds: string[] = [];
  watchLaterMovieListIds: string[] = [];

  ngOnInit() {
    this.favoriteMovieListIds = [];
    this.watchLaterMovieListIds = [];
  }

  onFavouritesChange(favourites: Movie[]) {
    this.favoriteMovieListIds = favourites.map((movie) => movie.id.toString());
  }

  onWatchListChange(watchList: Movie[]) {
    this.watchLaterMovieListIds = watchList.map((movie) => movie.id.toString());
  }
}
