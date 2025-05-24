import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { ClearObservable } from './models/clear-observable';
import { takeUntil } from 'rxjs';
import { LoginPopupComponent } from './components/login-popup/login-popup.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as MovieActions from './store/actions';
import { SubscriptionPopupComponent } from './components/subscription-popup/subscription-popup.component';
import { MoodRecommendationPopupComponent } from './components/mood-recommendation-popup/mood-recommendation-popup.component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    RouterModule,
    HttpClientModule,
    LoginPopupComponent,
    MenubarComponent,
    CommonModule,
    SubscriptionPopupComponent,
    MoodRecommendationPopupComponent,
  ],
})
export class AppComponent extends ClearObservable implements OnInit {
  title = 'movie-app';
  showSubscriptionForm = false;
  isSearching = false;

  onSearchingChange(value: boolean) {
    this.isSearching = value;
  }

  constructor(private authService: AuthService, private store: Store) {
    ('');
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(MovieActions.loadSessionFromStorage());
  }

  generateSessionId(username: string, password: string) {
    this.requestToken(username, password);
  }

  requestToken(username: string, password: string) {
    this.authService
      .getRequestToken()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          const token = response.request_token;
          console.log('Request token received:', token);
          this.authService.setToken(token);
          this.askForPermission(username, password, token);
        },
        error: (error) => {
          console.error('Error requesting token:', error);
        },
      });
  }

  askForPermission(username: string, password: string, token: string) {
    this.authService
      .askForPermission(username, password, token)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log('Permission granted for token:', token);
          this.createSessionId(token);
        },
        error: (error) => {
          console.error('Error asking for permission:', error);
        },
      });
  }

  createSessionId(token: string) {
    this.authService
      .createSessionId(token)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          const sessionId = response.session_id;
          console.log('Session ID created:', sessionId);
          this.authService.setSessionId(sessionId);
        },
        error: (error) => {
          console.error('Error creating session ID:', error);
        },
      });
  }
}
