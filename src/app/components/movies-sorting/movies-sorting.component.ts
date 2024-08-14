import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';
import { Observable } from 'rxjs';
import { Genre } from '../../models/movie';
import { ClearObservable } from '../../models/clear-observable';
import { select, Store } from '@ngrx/store';
import { selectGenres } from '../../store/selectors';
import { CommonModule } from '@angular/common';
import * as MovieActions from '../../store/actions';

@Component({
  selector: 'app-movies-sorting',
  standalone: true,
  imports: [ReactiveFormsModule, RatingModule, MultiSelectModule, CommonModule],
  templateUrl: './movies-sorting.component.html',
  styleUrl: './movies-sorting.component.scss',
})
export class MoviesSortingComponent implements OnInit {
  formGroup: FormGroup;
  genres$: Observable<Genre[] | null>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.genres$ = this.store.select(selectGenres);
    this.formGroup = this.fb.group({
      selectedGenres: [[]],
      value: [0],
    });
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe((value) => {
      const selectedGenres = value.selectedGenres || [];
      if (selectedGenres.length > 0) {
        this.store.dispatch(
          MovieActions.loadMoviesByGenres({
            genres: selectedGenres.map((g: Genre) => g.id),
          })
        );
      } else if (value.value && value.value > 0) {
        this.store.dispatch(
          MovieActions.loadMoviesByRating({ rating: value.value })
        );
      } else {
        this.store.dispatch(MovieActions.loadMoviesByGenres({ genres: [] }));
      }
    });
  }
}
