import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-p-movie-card',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule],
  templateUrl: './p-movie-card.component.html',
  styleUrl: './p-movie-card.component.scss'
})
export class PMovieCardComponent {
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
