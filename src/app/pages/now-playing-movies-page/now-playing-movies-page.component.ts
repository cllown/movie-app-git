import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie/movie.service';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
  selector: 'app-now-playing-movies-page',
  standalone: true,
  templateUrl: './now-playing-movies-page.component.html',
  styleUrl: './now-playing-movies-page.component.scss',
  imports: [RouterModule, MovieListComponent],
})
export class NowPlayingMoviesPageComponent implements OnInit {
  nowPlayingMovies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.nowPlayingMovies = this.movieService.getNowPlayingMovies();
  }
}
