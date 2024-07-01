import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { MovieTimeFormatingPipe } from '../../../pipes/movie-time-formating/movie-time-formating.pipe';
import { MovieService } from '../../../services/movie/movie.service';
import { Movie } from '../../../models/movie';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    CommonModule,
    MovieTimeFormatingPipe,
    RouterLink,
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  @Input() isActionsShow: boolean = true;
  @Input() isRemoveButtonShow = false;
  @Output() removeFromList = new EventEmitter<void>();

  constructor(private movieService: MovieService) {}

  onAddToFavourites() {
    this.movieService.addToFavourites(this.movie);
  }

  onAddToWatchList() {
    this.movieService.addToWatchList(this.movie);
  }

  onRemoveFromList() {
    this.removeFromList.emit();
  }
}
