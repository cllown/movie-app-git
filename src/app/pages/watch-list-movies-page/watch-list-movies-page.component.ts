import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { movies } from '../../mock-data/mock-movies';
import { PMovieCardComponent } from '../../components/p-movie-card/p-movie-card/p-movie-card.component';

@Component({
  selector: 'app-watch-list-movies-page',
  standalone: true,
  imports: [CommonModule, PMovieCardComponent],
  templateUrl: './watch-list-movies-page.component.html',
  styleUrl: './watch-list-movies-page.component.scss',
})
export class WatchListMoviesPageComponent implements OnInit {
  watchListMovies: Movie[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const dataString = params['data'];
      if (dataString) {
        const watchListMovieIds: string[] = JSON.parse(dataString);
        this.watchListMovies = movies.filter((movie) =>
          watchListMovieIds.includes(movie.id.toString())
        );
      }
    });
  }
  removeFromWatchList(movie: Movie) {
    this.watchListMovies = this.watchListMovies.filter(
      (m) => m.id !== movie.id
    );
  }
  trackById(index: number, item: Movie): number {
    return item.id;
  }
}
