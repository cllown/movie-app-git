import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { ActivatedRoute } from '@angular/router';
import { movies } from '../../mock-data/mock-movies';
import { MovieTimeFormatingPipe } from '../../pipes/movie-time-formating/movie-time-formating.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-movie-page',
  standalone: true,
  templateUrl: './details-movie-page.component.html',
  styleUrl: './details-movie-page.component.scss',
  imports: [MovieTimeFormatingPipe, CommonModule],
})
export class DetailsMoviePageComponent implements OnInit {
  @Input() movie: Movie | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const movieId = params['id'];
      this.movie = movies.find((movie) => movie.id.toString() === movieId);
    });
  }
}
