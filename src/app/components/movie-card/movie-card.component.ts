import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie/movie.service';
import { Movie } from '../../models/movie';
import { RatingRoundingPipe } from '../../pipes/rating-rounding/rating-rounding.pipe';
import { Store } from '@ngrx/store';
import { setMovieToFavourites, setMovieToWatchList } from '../../store/actions';


@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    CommonModule,
    RouterLink,
    RatingRoundingPipe
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  @Input() isActionsShow: boolean = true;
  @Input() isRemoveButtonShow = false;
  @Output() removeFromList = new EventEmitter<void>();

  constructor(private store: Store) {}

  onAddToFavourites(movieId: number) {
    this.store.dispatch(setMovieToFavourites({ movieId }));
  }
  
  onAddToWatchList(movieId: number) {
    this.store.dispatch(setMovieToWatchList({ movieId }));
  }

  onRemoveFromList() {
    this.removeFromList.emit();
  }
}
