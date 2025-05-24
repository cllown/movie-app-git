import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie/movie.service';
import { Genre, Movie } from '../../models/movie';
import { RatingRoundingPipe } from '../../pipes/rating-rounding/rating-rounding.pipe';
import { Store } from '@ngrx/store';
import { setMovieToFavourites, setMovieToWatchList } from '../../store/actions';
import { Observable, take, tap } from 'rxjs';
import {
  selectCustomLists,
  selectFavouriteMovies,
  selectIsLoggedIn,
  selectWatchListMovies,
} from '../../store/selectors';
import { DropdownModule } from 'primeng/dropdown';
import { Menu, MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import * as MovieActions from '../../store/actions';
import { SplitButtonModule } from 'primeng/splitbutton';

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
    SplitButtonModule,
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit {
  @ViewChild('customMenu') customMenu!: Menu;

  toggleMenu(event: Event) {
    if (this.customMenu) {
      this.customMenu.toggle(event);
    }
  }

  @Input() movie!: Movie;
  @Input() isActionsShow: boolean = true;
  @Input() isRemoveButtonShow = false;
  @Output() removeFromList = new EventEmitter<void>();

  genres$!: Observable<Genre[] | null>;
  isLoggedIn$!: Observable<boolean>;
  isFavourite$!: Observable<boolean>;
  isInWatchList$!: Observable<boolean>;
  customLists: { id: number; name: string }[] = [];
  customLists$!: Observable<{ id: number; name: string }[]>;
  customListMenuItems: MenuItem[] = [];

  constructor(private store: Store, private movieService: MovieService) {}

  ngOnInit(): void {
    this.customLists$ = this.store.select(selectCustomLists);

    this.customLists$.subscribe((lists) => {
      this.customLists = lists || [];
      this.prepareCustomListMenuItems();
    });
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
        this.store.dispatch(
          MovieActions.addMovieToCustomList({
            movieId: this.movie.id,
            listId,
          })
        );
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
