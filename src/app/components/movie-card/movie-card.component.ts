import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieTimePipe } from '../../pipes/movie-time/movie-time.pipe';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
  imports: [CommonModule, MovieTimePipe],
})
export class MovieCardComponent {
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
