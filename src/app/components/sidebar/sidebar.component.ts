import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { MoviesSortingComponent } from '../movies-sorting/movies-sorting.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Movie } from '../../models/movie';
import { Store } from '@ngrx/store';
import { selectSearchingMovies } from '../../store/selectors';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { tap } from 'rxjs/internal/operators/tap';
import { clearSearchResults, searchMovies } from '../../store/actions';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import * as MovieActions from '../../store/actions';
import { AuthService } from '../../services/auth/auth.service';
import { of } from 'rxjs/internal/observable/of';
import { selectIsLoggedIn } from '../../store/selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  sidebarVisible: boolean = false;
  searchControl = new FormControl('');
  movies$: Observable<Movie[] | null>;
  isLoggedIn$ = this.store.select(selectIsLoggedIn);

  constructor(private store: Store, private authService: AuthService) {
    this.movies$ = this.store.select(selectSearchingMovies);

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        tap((query) => {
          if (query) {
            this.store.dispatch(searchMovies({ query }));
          } else {
            this.store.dispatch(clearSearchResults());
          }
        }),
        switchMap(() => this.movies$)
      )
      .subscribe();
  }
  openLoginPopup() {
    this.store.dispatch(MovieActions.openLoginPopup());
  }
}
