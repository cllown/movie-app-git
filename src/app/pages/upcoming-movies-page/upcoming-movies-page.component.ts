import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie/movie.service';

@Component({
  selector: 'app-upcoming-movies-page',
  standalone: true,
  templateUrl: './upcoming-movies-page.component.html',
  styleUrl: './upcoming-movies-page.component.scss',
  imports: [RouterModule, MovieListComponent],
})
export class UpcomingMoviesPageComponent implements OnInit {
  upcomingMovies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.upcomingMovies = this.movieService.getUpcomingMovies();
  }
}
