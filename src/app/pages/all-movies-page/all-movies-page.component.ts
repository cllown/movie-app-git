import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie/movie.service';
import { MovieListComponent } from "../../components/movie-list/movie-list.component";

@Component({
    selector: 'app-all-movies-page',
    standalone: true,
    templateUrl: './all-movies-page.component.html',
    styleUrl: './all-movies-page.component.scss',
    imports: [MovieListComponent]
})
export class AllMoviesPageComponent implements OnInit{
  allMovies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(){
    this.allMovies=this.movieService.getAllMovies();
  }
}
