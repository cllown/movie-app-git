import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Movie } from '../../../models/movie';
import { ButtonModule } from 'primeng/button';
import { MovieTimePipe } from '../../../pipes/movie-time/movie-time.pipe';
@Component({
  selector: 'app-p-movie-card',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, MovieTimePipe],
  templateUrl: './p-movie-card.component.html',
  styleUrl: './p-movie-card.component.scss',
})
export class PMovieCardComponent {
  @Input() movie: Movie | undefined;
  @Input() showActions: boolean = true;
  @Input() showRemoveButton = false;
  @Output() addToFavourites = new EventEmitter<void>();
  @Output() addToWatchList = new EventEmitter<void>();
  @Output() removeFromList = new EventEmitter<void>();

  onAddToFavourites() {
    this.addToFavourites.emit();
  }

  onAddToWatchList() {
    this.addToWatchList.emit();
  }

  onRemoveFromList() {
    this.removeFromList.emit();
  }
}
