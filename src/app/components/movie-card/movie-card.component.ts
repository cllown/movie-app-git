import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie/movie.service';
import { Genre, Movie } from '../../models/movie';
import { RatingRoundingPipe } from '../../pipes/rating-rounding/rating-rounding.pipe';
import { Store } from '@ngrx/store';
import { setMovieToFavourites, setMovieToWatchList } from '../../store/actions';
import { map, Observable, take, tap } from 'rxjs';
import {
  selectFavouriteMovies,
  selectGenres,
  selectIsLoggedIn,
  selectWatchListMovies,
} from '../../store/selectors';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import * as MovieActions from '../../store/actions';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    CommonModule,
    RouterLink,
    RatingRoundingPipe,
    DropdownModule,
    MenuModule,
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit {
  @Input() customLists: { id: number; name: string }[] = [];
  @Input() movie!: Movie;
  @Input() isActionsShow: boolean = true;
  @Input() isRemoveButtonShow = false;
  @Output() removeFromList = new EventEmitter<void>();

  genres$!: Observable<Genre[] | null>;
  isLoggedIn$!: Observable<boolean>;
  isFavourite$!: Observable<boolean>;
  isInWatchList$!: Observable<boolean>;

  constructor(private store: Store, private movieService: MovieService) {}

  ngOnInit(): void {
    this.prepareCustomListMenuItems();
    this.genres$ = this.movieService.getGenreNames(this.movie.genre_ids);
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);

    this.isFavourite$ = this.movieService.checkIfMovieInList(
      this.movie.id,
      this.store.select(selectFavouriteMovies)
    );
    this.isInWatchList$ = this.movieService.checkIfMovieInList(
      this.movie.id,
      this.store.select(selectWatchListMovies)
    );
  }

  customListMenuItems: MenuItem[] = [];

  prepareCustomListMenuItems() {
    this.customListMenuItems = this.customLists.map((list) => ({
      label: list.name,
      icon: 'pi pi-plus',
      command: () => this.addToCustomList(list.id),
    }));
  }

  addToCustomList(listId: number) {
    this.isLoggedIn$.pipe(take(1)).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.movieService
          .addMovieToCustomList(this.movie.id, listId)
          .subscribe({
            next: () => {},
            error: (err) => {
              console.error('Failed to add movie to custom list', err);
            },
          });
      } else {
        this.openLoginPopup();
      }
    });
  }

  onAddToFavourites(movieId: number) {
    this.isLoggedIn$
      .pipe(
        take(1),
        tap((isLoggedIn) => {
          if (isLoggedIn) {
            this.store.dispatch(setMovieToFavourites({ movieId }));
          } else {
            this.openLoginPopup();
          }
        })
      )
      .subscribe();
  }

  onAddToWatchList(movieId: number) {
    this.isLoggedIn$
      .pipe(
        take(1),
        tap((isLoggedIn) => {
          if (isLoggedIn) {
            this.store.dispatch(setMovieToWatchList({ movieId }));
          } else {
            this.openLoginPopup();
          }
        })
      )
      .subscribe();
  }

  private checkMovieInList(
    movies$: Observable<Movie[] | null>,
    movieId: number
  ): Observable<boolean> {
    return movies$.pipe(
      map((movies) => movies?.some((movie) => movie.id === movieId) || false)
    );
  }

  onRemoveFromList() {
    this.removeFromList.emit();
  }

  getGenreNames(genreIds: number[], genres: Genre[]): string {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name || 'Unknown')
      .join(', ');
  }

  private openLoginPopup() {
    this.store.dispatch(MovieActions.openLoginPopup());
  }
}
