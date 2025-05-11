import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { selectIsLoggedIn } from '../../store/selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import * as MovieActions from '../../store/actions';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isLoggedIn$ = this.store.select(selectIsLoggedIn);
  sidebarVisible: boolean = false;
  constructor(private store: Store) {}
  openLoginPopup() {
    this.store.dispatch(MovieActions.openLoginPopup());
  }
}
