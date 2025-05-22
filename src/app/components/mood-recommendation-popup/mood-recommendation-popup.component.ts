import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Movie } from '../../models/movie';
import { SelectItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { closeMoodRecommendationPopup } from '../../store/actions';
import { selectIsMoodRecommendationPopupVisible } from '../../store/selectors';
import { MovieService } from '../../services/movie/movie.service';

@Component({
  selector: 'app-mood-recommendation-popup',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    MovieCardComponent,
  ],
  templateUrl: './mood-recommendation-popup.component.html',
  styleUrl: './mood-recommendation-popup.component.scss',
})
export class MoodRecommendationPopupComponent implements OnInit {
  isVisible = false;
  selectedMood: string | null = null;
  recommendedMovies: Movie[] = [];
  isLoading = false;

  moods: SelectItem[] = [
    { label: 'Happy', value: 'happy' },
    { label: 'Sad', value: 'sad' },
    { label: 'Romantic', value: 'romantic' },
    { label: 'Adventurous', value: 'adventure' },
    { label: 'Relaxed', value: 'calm' },
  ];

  private moodGenreMap: Record<string, number[]> = {
    happy: [35, 16, 10751], // Comedy, Animation, Family
    sad: [18, 10749], // Drama, Romance
    romantic: [10749, 18], // Romance, Drama
    adventure: [12, 28, 878], // Adventure, Action, Sci-Fi
    calm: [99, 10402], // Documentary, Music
  };

  constructor(private store: Store, private movieService: MovieService) {}

  ngOnInit(): void {
    this.store
      .select(selectIsMoodRecommendationPopupVisible)
      .subscribe((visible) => {
        this.isVisible = visible;
        if (visible) {
          this.recommendedMovies = [];
        }
      });
  }

  onGetMovies(): void {
    //console.log('Clicked "Get Movies"');

    if (!this.selectedMood) {
      //console.warn('No mood selected');
      return;
    }

    const moodKey = this.selectedMood;
    const genreIds = this.moodGenreMap[moodKey];

    if (!genreIds) {
      //console.warn('No genres found for mood:', this.selectedMood);
      return;
    }

    this.isLoading = true;
    //console.log('Calling movieService with genres:', genreIds);

    this.movieService.getMoodBasedRecommendations(genreIds).subscribe({
      next: (movies) => {
        //console.log('Fetched movies:', movies);
        this.recommendedMovies = movies;
        this.isLoading = false;
      },
      error: (err) => {
        //console.error('Error fetching movies:', err);
        this.isLoading = false;
      },
    });
  }

  onClose(): void {
    this.store.dispatch(closeMoodRecommendationPopup());
  }

  onReroll(): void {
    this.onGetMovies();
  }
}
