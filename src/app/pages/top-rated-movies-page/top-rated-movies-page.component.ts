import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie/movie.service';

@Component({
  selector: 'app-top-rated-movies-page',
  standalone: true,
  templateUrl: './top-rated-movies-page.component.html',
  styleUrl: './top-rated-movies-page.component.scss',
  imports: [RouterModule, MovieListComponent],
})
export class TopRatedMoviesPageComponent implements OnInit {
  topRatedMovies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getTopRatedMovies().subscribe(data =>  {
      this.topRatedMovies = data.results;
    });
  }
}
