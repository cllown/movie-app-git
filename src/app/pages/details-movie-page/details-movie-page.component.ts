import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie/movie.service';
import { Movie } from '../../models/movie';
import { RatingRoundingPipe } from "../../pipes/rating-rounding/rating-rounding.pipe";

@Component({
    selector: 'app-details-movie-page',
    standalone: true,
    templateUrl: './details-movie-page.component.html',
    styleUrls: ['./details-movie-page.component.scss'],
    imports: [CommonModule, RatingRoundingPipe]
})
export class DetailsMoviePageComponent implements OnInit {
  movie: Movie | undefined;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const movieId = +params['id'];
      this.movieService.getMovieDetails(movieId).subscribe((movie) => {
        this.movie = movie;
      });
    });
  }
}
