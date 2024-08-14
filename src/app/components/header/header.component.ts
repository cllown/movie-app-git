import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../../store/selectors';
import * as MovieActions from '../../store/actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store, private router: Router) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
  }

  openLoginPopup(): void {
    this.store.dispatch(MovieActions.openLoginPopup());
  }

  handleNavigation(url: string): void {
    this.isLoggedIn$.pipe(
      switchMap(isLoggedIn => {
        if (isLoggedIn) {
          return this.router.navigate([url]);
        } else {
          this.openLoginPopup();
          return of(null);
        }
      })
    ).subscribe();
  }
}