import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl } from '@angular/forms';
import { debounceTime, Observable, switchMap, tap } from 'rxjs';
import { Movie } from '../../models/movie';
import { Store } from '@ngrx/store';
import { clearSearchResults, searchMovies } from '../../store/actions';
import { selectSearchingMovies } from '../../store/selectors';
import { MovieListComponent } from "../movie-list/movie-list.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesSortingComponent } from "../movies-sorting/movies-sorting.component";

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [SidebarComponent, ToolbarModule, InputTextModule, MovieListComponent, CommonModule, ReactiveFormsModule, MoviesSortingComponent],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss'
})
export class MenubarComponent {
  searchControl = new FormControl('');
  movies$: Observable<Movie[] | null>;

  constructor(private store: Store) {
    this.movies$ = this.store.select(selectSearchingMovies);

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      tap(query => {
        if (query) {
          this.store.dispatch(searchMovies({ query }));
        } else {
          this.store.dispatch(clearSearchResults());
        }
      }),
      switchMap(() => this.movies$)
    ).subscribe();
  }
}