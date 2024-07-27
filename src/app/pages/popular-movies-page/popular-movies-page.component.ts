import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink, RouterModule } from '@angular/router';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { MovieService } from '../../services/movie/movie.service';
import { Movie } from '../../models/movie';
import { ClearObservable } from '../../models/clear-observable';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-popular-movies-page',
  standalone: true,
  templateUrl: './popular-movies-page.component.html',
  styleUrls: ['./popular-movies-page.component.scss'],
  imports: [
    HttpClientModule,
    HeaderComponent,
    RouterLink,
    RouterModule,
    MovieListComponent,
  ],
})
export class PopularMoviesPageComponent extends ClearObservable implements OnInit {
  popularMovies: Movie[] = [];

  constructor(private movieService: MovieService) {
    super();
  }

  ngOnInit() {
    this.movieService.getPopularMovies().pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.popularMovies = data.results;
    });
  }
}
