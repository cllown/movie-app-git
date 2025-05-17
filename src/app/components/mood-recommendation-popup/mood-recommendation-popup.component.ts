import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../models/movie';
import { SelectItem } from 'primeng/api';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { closeMoodRecommendationPopup } from '../../store/actions';
import {
  selectAllMovies,
  selectFilteredMovies,
  selectIsMoodRecommendationPopupVisible,
} from '../../store/selectors';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs/internal/Observable';
import { combineLatest, first, map } from 'rxjs';
import * as MovieActions from '../../store/actions';

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
export class MoodRecommendationPopupComponent {
  isVisible: boolean = false;
  moods: SelectItem[] = [
    { label: 'Happy', value: 'happy' },
    { label: 'Sad', value: 'sad' },
    { label: 'Romantic', value: 'romantic' },
    { label: 'Adventurous', value: 'adventure' },
    { label: 'Relaxed', value: 'calm' },
  ];

  allMovies$!: Observable<Movie[] | null>;
  private subscription: Subscription | undefined;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select(selectIsMoodRecommendationPopupVisible)
      .subscribe((visible) => {
        this.isVisible = visible;

        if (visible) {
          // если фильмы ещё не загружены — загружаем
          this.store
            .select(selectAllMovies)
            .pipe(first())
            .subscribe((movies) => {
              if (!movies || movies.length === 0) {
                this.store.dispatch(MovieActions.loadGenres());
                this.store.dispatch(MovieActions.loadPopularMovies());
                this.store.dispatch(MovieActions.loadNowPlayingMovies());
                this.store.dispatch(MovieActions.loadTopRatedMovies());
                this.store.dispatch(MovieActions.loadUpcomingMovies());
                this.store.dispatch(MovieActions.loadRecomendationMovies());
              }
            });
        }
      });

    const allMovies$ = this.store.select(selectAllMovies);
    const filteredMovies$ = this.store.select(selectFilteredMovies);

    this.allMovies$ = combineLatest([filteredMovies$, allMovies$]).pipe(
      map(([filtered, all]) =>
        filtered && filtered.length > 0 ? filtered : all ?? []
      )
    );
  }

  selectedMood: string | null = null;
  recommendedMovies: Movie[] = [];

  handleMoodChange(event: any) {
    this.selectedMood = event.value;
  }

  onGetMovies() {
    if (!this.selectedMood) {
      console.warn('Mood not selected');
      return;
    }

    this.allMovies$.pipe(first()).subscribe((movies) => {
      console.log('Movies loaded for mood matching:', movies);

      if (!movies || movies.length === 0) {
        console.warn('Movie list is empty');
        return;
      }

      const filtered = movies.filter((movie) =>
        this.matchMood(movie, this.selectedMood!)
      );

      if (filtered.length === 0) {
        console.warn('No matching movies found for mood:', this.selectedMood);
      }

      this.recommendedMovies = this.shuffleArray(filtered).slice(0, 4);
    });
  }

  onReroll() {
    this.onGetMovies();
  }

  onClose() {
    this.store.dispatch(closeMoodRecommendationPopup());
  }

  shuffleArray(arr: Movie[]): Movie[] {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  matchMood(movie: Movie, mood: string): boolean {
    const genreMap: Record<string, string[]> = {
      happy: ['Comedy', 'Animation', 'Family'],
      sad: ['Drama', 'Romance'],
      romantic: ['Romance', 'Drama'],
      adventure: ['Action', 'Adventure', 'Sci-Fi'],
      calm: ['Documentary', 'Music'],
    };

    const targetGenres = genreMap[mood];
    if (!targetGenres) {
      console.warn(`[matchMood] Unknown mood: '${mood}'`);
      return false;
    }

    const movieGenres = movie.genre_ids.map((id) => this.getGenreNameById(id));
    return movieGenres.some((genre) => targetGenres.includes(genre));
  }

  getGenreNameById(id: number): string {
    const genres: Record<number, string> = {
      28: 'Action',
      35: 'Comedy',
      18: 'Drama',
      10749: 'Romance',
      12: 'Adventure',
      16: 'Animation',
      99: 'Documentary',
      10402: 'Music',
      10751: 'Family',
      878: 'Sci-Fi',
    };
    return genres[id] || 'Unknown';
  }
}
