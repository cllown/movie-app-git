import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../services/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import {
  selectFavouriteMovies,
  selectUsername,
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
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  favouriteMovies$!: Observable<Movie[] | null>;
  watchListMovies$!: Observable<Movie[] | null>;
  username$: Observable<string | null>;
  availableGenres: string[] = [
    'Action',
    'Comedy',
    'Drama',
    'Horror',
    'Sci-Fi',
    'Fantasy',
  ];
  selectedGenres: string[] = [];

  constructor(
    private authService: AuthService,
    private store: Store,
    private movieService: MovieService
  ) {
    this.username$ = this.store.select(selectUsername);
  }

  ngOnInit() {
    this.favouriteMovies$ = this.store.select(selectFavouriteMovies);
    this.watchListMovies$ = this.store.select(selectWatchListMovies);
    this.loadCustomLists();
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
}
