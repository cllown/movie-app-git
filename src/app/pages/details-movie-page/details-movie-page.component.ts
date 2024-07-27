import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie/movie.service';
import { Movie } from '../../models/movie';
import { RatingRoundingPipe } from "../../pipes/rating-rounding/rating-rounding.pipe";
import { ClearObservable } from '../../models/clear-observable';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'app-details-movie-page',
    standalone: true,
    templateUrl: './details-movie-page.component.html',
    styleUrls: ['./details-movie-page.component.scss'],
    imports: [CommonModule, RatingRoundingPipe]
})
export class DetailsMoviePageComponent extends ClearObservable implements OnInit {
  movie: Movie | undefined;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {
    super();
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const movieId = +params['id'];
      this.movieService.getMovieDetails(movieId).subscribe((movie) => {
        this.movie = movie;
      });
    });
  }
}
