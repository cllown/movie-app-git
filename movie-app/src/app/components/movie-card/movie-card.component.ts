import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input() movie: {
    backdrop_path: string;
    id: number;
    description: string;
    release_date: string;
    title: string;
    rating: string;
  } | undefined;
  @Output() addToFavourites = new EventEmitter<void>();
  @Output() addToWatchList = new EventEmitter<void>();

  onAddToFavourites(){
    this.addToFavourites.emit();
  }

  onAddToWatchList(){
    this.addToWatchList.emit();
  }
}
