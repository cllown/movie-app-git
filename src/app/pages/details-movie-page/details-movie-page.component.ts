import {
  selectCustomLists,
  selectFavouriteMovies,
  selectIsLoggedIn,
  selectIsSubscribed,
  selectWatchListMovies,
  selectSelectedMovie,
} from './../../store/selectors';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { RatingRoundingPipe } from '../../pipes/rating-rounding/rating-rounding.pipe';
import {
  EMPTY,
  Observable,
  combineLatest,
  switchMap,
  take,
  tap,
  map,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import * as MovieActions from '../../store/actions';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu, MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-details-movie-page',
  standalone: true,
  templateUrl: './details-movie-page.component.html',
  styleUrls: ['./details-movie-page.component.scss'],
  imports: [CommonModule, RatingRoundingPipe, ButtonModule, MenuModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsMoviePageComponent implements OnInit {
  movie$!: Observable<Movie | null>;
  isLoggedIn$ = this.store.select(selectIsLoggedIn);
  isSubscribed$ = this.store.select(selectIsSubscribed);
  customLists$ = this.store.select(selectCustomLists);

  isFavourite$!: Observable<boolean>;
  isInWatchList$!: Observable<boolean>;
  customListMenuItems: MenuItem[] = [];
  @ViewChild('customMenu') customMenu!: Menu;

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.movie$ = this.store.select(selectSelectedMovie);

    this.initAdditionalFlags();
    this.customLists$.subscribe((lists) => {
      this.prepareCustomListMenuItems(lists || []);
    });
  }
  toggleMenu(event: Event) {
    if (this.customMenu) {
      this.customMenu.toggle(event);
    }
  }
  private initAdditionalFlags() {
    this.isFavourite$ = combineLatest([
      this.movie$,
      this.store.select(selectFavouriteMovies),
    ]).pipe(
      map(([movie, favourites]) =>
        movie ? favourites?.some((m) => m.id === movie.id) ?? false : false
      )
    );

    this.isInWatchList$ = combineLatest([
      this.movie$,
      this.store.select(selectWatchListMovies),
    ]).pipe(
      map(([movie, watchlist]) =>
        movie ? watchlist?.some((m) => m.id === movie.id) ?? false : false
      )
    );
  }

  prepareCustomListMenuItems(lists: { id: number; name: string }[]) {
    if (!lists || lists.length === 0) {
      this.customListMenuItems = [
        {
          label: 'You don`t have any custom lists yet.',
          disabled: true,
        },
      ];
    } else {
      this.customListMenuItems = lists.map((list) => ({
        label: list.name,
        icon: 'pi pi-plus',
        command: () => this.addToCustomList(list.id),
      }));
    }
  }

  onWatch(movieId: number) {
    this.isLoggedIn$
      .pipe(
        take(1),
        switchMap((isLoggedIn) => {
          if (!isLoggedIn) {
            this.openLoginPopup();
            return EMPTY;
          }
          return this.isSubscribed$.pipe(
            take(1),
            tap((isSubscribed) => {
              if (isSubscribed) {
                this.router.navigate(['/movie/watch/', movieId]);
              } else {
                this.openSubscriptionPopup();
              }
            })
          );
        })
      )
      .subscribe();
  }

  private openLoginPopup() {
    this.store.dispatch(MovieActions.openLoginPopup());
  }

  private openSubscriptionPopup() {
    this.store.dispatch(MovieActions.openSubscriptionPopup());
  }

  addToCustomList(listId: number) {
    this.isLoggedIn$
      .pipe(
        take(1),
        switchMap((isLoggedIn) => {
          if (!isLoggedIn) {
            this.openLoginPopup();
            return EMPTY;
          }
          return this.movie$.pipe(
            take(1),
            tap((movie) => {
              if (movie) {
                this.store.dispatch(
                  MovieActions.addMovieToCustomList({
                    movieId: movie.id,
                    listId,
                  })
                );
              }
            })
          );
        })
      )
      .subscribe();
  }

  onAddToFavourites(movieId: number) {
    this.isLoggedIn$
      .pipe(
        take(1),
        tap((isLoggedIn) => {
          if (isLoggedIn) {
            this.store.dispatch(MovieActions.setMovieToFavourites({ movieId }));
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
            this.store.dispatch(MovieActions.setMovieToWatchList({ movieId }));
          } else {
            this.openLoginPopup();
          }
        })
      )
      .subscribe();
  }
}
