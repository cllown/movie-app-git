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
  selectUsername,
  selectWatchListMovies,
} from '../../store/selectors';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { Movie } from '../../models/movie';
import {
  removeMovieFromFavourites,
  removeMovieFromWatchList,
} from '../../store/actions';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import * as MovieActions from '../../store/actions';
import { DropdownModule } from 'primeng/dropdown';
import { MoodRecommendationPopupComponent } from '../../components/mood-recommendation-popup/mood-recommendation-popup.component';
import { MovieService } from '../../services/movie/movie.service';

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
  username$: Observable<string | null>;
  isLoggedin!: Observable<boolean | null>;
  favouriteMovies$!: Observable<Movie[] | null>;
  watchListMovies$!: Observable<Movie[] | null>;
  allMovies$!: Observable<Movie[] | null>;
  allMovies: Movie[] = [];
  recommendationMovies$!: Observable<Movie[]>;
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

  constructor(private store: Store, private movieService: MovieService) {
    this.isLoggedin = this.store.select(selectIsLoggedIn);
    this.username$ = this.store.select(selectUsername);
  }
  ngOnInit() {
    this.favouriteMovies$ = this.store.select(selectFavouriteMovies);
    this.watchListMovies$ = this.store.select(selectWatchListMovies);
    this.loadCustomLists();
    this.recommendationMovies$ = this.movieService.getFavouriteMovies().pipe(
      take(1),
      map((favMovies) => favMovies.map((movie) => movie.id)),
      switchMap((favIds) => {
        if (favIds.length === 0) return of([]);
        return this.movieService.getSmartRecommendations(favIds);
      })
    );
  }
  loadCustomLists() {
    this.movieService.getCustomLists().subscribe((response) => {
      this.customLists = response.results || [];
      this.customLists.forEach((list) => {
        this.movieService.getMoviesInCustomList(list.id).subscribe((movies) => {
          this.customListMovies[list.id] = movies;
        });
      });
    });
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

  //CUSTOM LISTS LOGIC
  customLists: any[] = [];
  customListMovies: { [listId: number]: Movie[] } = [];
  newListName = '';

  createNewList() {
    if (!this.newListName.trim()) return;

    this.movieService.createCustomList(this.newListName).subscribe(() => {
      this.newListName = '';
      this.loadCustomLists(); // Перезагрузка списков
    });
  }
  deleteList(listId: number) {
    this.movieService.deleteCustomList(listId).subscribe(() => {
      this.loadCustomLists();
    });
  }
  removeFromCustomList(movieId: number, listId: number) {
    this.store.dispatch(
      MovieActions.removeMovieFromCustomList({ movieId, listId })
    );
  }
}
