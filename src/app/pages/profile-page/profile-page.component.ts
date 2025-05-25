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
  selectIsSubscribed,
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
  username$ = this.store.select(selectUsername);
  isLoggedin$ = this.store.select(selectIsLoggedIn);
  favouriteMovies$ = this.store.select(selectFavouriteMovies);
  watchListMovies$ = this.store.select(selectWatchListMovies);
  allMovies$ = this.store.select(selectAllMovies);
  recommendationMovies$!: Observable<Movie[]>;
  isSubscribed$ = this.store.select(selectIsSubscribed);
  showUnsubscribeButton = false;

  customLists: any[] = [];
  customListMovies: Record<number, Movie[]> = {};
  newListName = '';

  constructor(private store: Store, private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadCustomLists();

    this.recommendationMovies$ = this.movieService.getFavouriteMovies().pipe(
      take(1),
      map((favMovies) => favMovies.map((m) => m.id)),
      switchMap((ids) =>
        ids.length ? this.movieService.getSmartRecommendations(ids) : of([])
      )
    );
  }

  openMoodPopup() {
    this.store.dispatch(MovieActions.openMoodRecommendationPopup());
  }

  logout() {
    this.store.dispatch(MovieActions.logout());
  }

  removeFromFavourites(movieId: number) {
    this.store.dispatch(removeMovieFromFavourites({ movieId }));
  }

  removeFromWatchList(movieId: number) {
    this.store.dispatch(removeMovieFromWatchList({ movieId }));
  }

  removeFromCustomList(movieId: number, listId: number) {
    this.store.dispatch(
      MovieActions.removeMovieFromCustomList({ movieId, listId })
    );
  }

  createNewList() {
    const name = this.newListName.trim();
    if (!name) return;

    this.movieService.createCustomList(name).subscribe(() => {
      this.newListName = '';
      this.loadCustomLists();
    });
  }

  deleteList(listId: number) {
    this.movieService.deleteCustomList(listId).subscribe(() => {
      this.loadCustomLists();
    });
  }
  onToggleUnsubscribe() {
    this.showUnsubscribeButton = !this.showUnsubscribeButton;
  }
  onUnsubscribe() {
    this.store.dispatch(MovieActions.unsubscribe());
    this.showUnsubscribeButton = false;
  }
  private loadCustomLists() {
    this.movieService.getCustomLists().subscribe(({ results }) => {
      this.customLists = results || [];
      this.customLists.forEach((list) => {
        this.movieService.getMoviesInCustomList(list.id).subscribe((movies) => {
          this.customListMovies[list.id] = movies;
        });
      });
    });
  }
}
