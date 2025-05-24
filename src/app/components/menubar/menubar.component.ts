import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl } from '@angular/forms';
import { debounceTime, Observable, switchMap, tap } from 'rxjs';
import { Movie } from '../../models/movie';
import { Store } from '@ngrx/store';
import { clearSearchResults, searchMovies } from '../../store/actions';
import { selectSearchingMovies } from '../../store/selectors';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesSortingComponent } from '../movies-sorting/movies-sorting.component';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [
    ButtonModule,
    SidebarComponent,
    ToolbarModule,
    InputTextModule,
    MovieListComponent,
    CommonModule,
    ReactiveFormsModule,
    MoviesSortingComponent,
  ],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss',
})
export class MenubarComponent {
  @Output() isSearchingChange = new EventEmitter<boolean>();

  searchControl = new FormControl('');
  movies$: Observable<Movie[] | null>;

  constructor(private store: Store, private router: Router) {
    this.movies$ = this.store.select(selectSearchingMovies);

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        tap((query) => {
          const queryStr = query?.trim() ?? '';
          const isSearching = !!queryStr;

          this.isSearchingChange.emit(isSearching);

          if (isSearching) {
            this.store.dispatch(searchMovies({ query: queryStr }));
          } else {
            this.store.dispatch(clearSearchResults());
          }
        }),
        switchMap(() => this.movies$)
      )
      .subscribe();
  }

  get isRootRoute(): boolean {
    return this.router.url === '/';
  }
}
