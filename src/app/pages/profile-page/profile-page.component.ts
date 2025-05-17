import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../services/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import {
  selectAllMovies,
  selectFavouriteMovies,
  selectIsLoggedIn,
  selectWatchListMovies,
} from '../../store/selectors';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';
import {
  removeMovieFromFavourites,
  removeMovieFromWatchList,
} from '../../store/actions';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import * as MovieActions from '../../store/actions';
import { DropdownModule } from 'primeng/dropdown';
import { MoodRecommendationPopupComponent } from '../../components/mood-recommendation-popup/mood-recommendation-popup.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    MultiSelectModule,
    CardModule,
    ButtonModule,
    MovieCardComponent,
    DropdownModule,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  isLoggedin!: Observable<boolean | null>;
  favouriteMovies$!: Observable<Movie[] | null>;
  watchListMovies$!: Observable<Movie[] | null>;
  allMovies$!: Observable<Movie[] | null>;
  allMovies: Movie[] = [];
  availableGenres: string[] = [
    'Action',
    'Comedy',
    'Drama',
    'Horror',
    'Sci-Fi',
    'Fantasy',
  ];
  selectedGenres: string[] = [];
  @ViewChild(MoodRecommendationPopupComponent)
  moodPopup!: MoodRecommendationPopupComponent;

  constructor(private authService: AuthService, private store: Store) {
    this.isLoggedin = this.store.select(selectIsLoggedIn);
  }

  ngOnInit() {
    this.favouriteMovies$ = this.store.select(selectFavouriteMovies);
    this.watchListMovies$ = this.store.select(selectWatchListMovies);
    this.allMovies$ = this.store.select(selectAllMovies);
    this.allMovies$.subscribe((movies) => {
      this.allMovies = movies ?? [];
    });
  }
  openMoodPopup() {
    this.store.dispatch(MovieActions.openMoodRecommendationPopup());
  }

  logout(): void {
    this.store.dispatch(MovieActions.logout());
  }

  removeFromFavourites(movieId: number) {
    this.store.dispatch(removeMovieFromFavourites({ movieId }));
  }
  removeFromWatchList(movieId: number) {
    this.store.dispatch(removeMovieFromWatchList({ movieId }));
  }
}
