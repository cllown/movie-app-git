import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie/movie.service';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { takeUntil } from 'rxjs';
import { ClearObservable } from '../../models/clear-observable';

@Component({
  selector: 'app-now-playing-movies-page',
  standalone: true,
  templateUrl: './now-playing-movies-page.component.html',
  styleUrl: './now-playing-movies-page.component.scss',
  imports: [RouterModule, MovieListComponent],
})
export class NowPlayingMoviesPageComponent extends ClearObservable implements OnInit {
  nowPlayingMovies: Movie[] = [];

  constructor(private movieService: MovieService) {
    super();
  }

  ngOnInit() {
    this.movieService.getNowPlayingMovies().pipe(takeUntil(this.destroy$)).subscribe(data =>  {
      this.nowPlayingMovies = data.results;
    });
  }
}
