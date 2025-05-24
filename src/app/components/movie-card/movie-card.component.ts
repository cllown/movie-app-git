import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie/movie.service';
import { Genre, Movie } from '../../models/movie';
import { RatingRoundingPipe } from '../../pipes/rating-rounding/rating-rounding.pipe';
import { Store } from '@ngrx/store';
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
import { Observable, take } from 'rxjs';

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

  @Input() movie!: Movie;
  @Input() isActionsShow = true;
  @Input() isRemoveButtonShow = false;
  @Output() removeFromList = new EventEmitter<void>();

  isLoggedIn$!: Observable<boolean>;
  isFavourite$!: Observable<boolean>;
  isInWatchList$!: Observable<boolean>;
  genres$!: Observable<Genre[] | null>;
  customLists$!: Observable<{ id: number; name: string }[]>;
  customListMenuItems: MenuItem[] = [];

  private store = inject(Store);
  private movieService = inject(MovieService);

  ngOnInit(): void {
    this.genres$ = this.movieService.getGenreNames(this.movie.genre_ids);
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.customLists$ = this.store.select(selectCustomLists);

    this.isFavourite$ = this.movieService.checkIfMovieInList(
      this.movie.id,
      this.store.select(selectFavouriteMovies)
    );

    this.isInWatchList$ = this.movieService.checkIfMovieInList(
      this.movie.id,
      this.store.select(selectWatchListMovies)
    );

    this.customLists$.pipe(take(1)).subscribe((lists) => {
      this.prepareCustomListMenuItems(lists ?? []);
    });
  }

  toggleMenu(event: Event): void {
    if (this.customMenu) {
      this.customMenu.toggle(event);
    }
  }

  onAddToFavourites(): void {
    this.dispatchIfLoggedIn(() =>
      this.store.dispatch(
        MovieActions.setMovieToFavourites({ movieId: this.movie.id })
      )
    );
  }

  onAddToWatchList(): void {
    this.dispatchIfLoggedIn(() =>
      this.store.dispatch(
        MovieActions.setMovieToWatchList({ movieId: this.movie.id })
      )
    );
  }

  addToCustomList(listId: number): void {
    this.dispatchIfLoggedIn(() =>
      this.store.dispatch(
        MovieActions.addMovieToCustomList({ movieId: this.movie.id, listId })
      )
    );
  }

  onRemoveFromList(): void {
    this.removeFromList.emit();
  }

  private prepareCustomListMenuItems(
    lists: { id: number; name: string }[]
  ): void {
    this.customListMenuItems = lists.map((list) => ({
      label: list.name,
      icon: 'pi pi-plus',
      command: () => this.addToCustomList(list.id),
    }));
  }

  private dispatchIfLoggedIn(action: () => void): void {
    this.isLoggedIn$.pipe(take(1)).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        action();
      } else {
        this.openLoginPopup();
      }
    });
  }
  getGenreNames(genreIds: number[], genres: Genre[]): string {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name || 'Unknown')
      .join(', ');
  }

  private openLoginPopup(): void {
    this.store.dispatch(MovieActions.openLoginPopup());
  }
}
