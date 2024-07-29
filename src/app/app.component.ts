import { Component, OnInit } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PopularMoviesPageComponent } from './pages/popular-movies-page/popular-movies-page.component';
import { TopRatedMoviesPageComponent } from './pages/top-rated-movies-page/top-rated-movies-page.component';
import { UpcomingMoviesPageComponent } from './pages/upcoming-movies-page/upcoming-movies-page.component';
import { DetailsMoviePageComponent } from './pages/details-movie-page/details-movie-page.component';
import { NowPlayingMoviesPageComponent } from './pages/now-playing-movies-page/now-playing-movies-page.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { ClearObservable } from './models/clear-observable';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    SidebarComponent,
    PopularMoviesPageComponent,
    TopRatedMoviesPageComponent,
    UpcomingMoviesPageComponent,
    DetailsMoviePageComponent,
    NowPlayingMoviesPageComponent,
    HeaderComponent,
    HttpClientModule,
  ],
})
export class AppComponent extends ClearObservable implements OnInit {
  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit() {
    this.generateSessionId();
  }

  generateSessionId() {
    this.requestToken();
  }

  requestToken() {
    this.authService
      .getRequestToken()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          const token = response.request_token;
          console.log('Request token received:', token);
          this.authService.setToken(token);
          this.askForPermission(token);
        },
        error: (error) => {
          console.error('Error requesting token:', error);
        },
      });
  }

  askForPermission(token: string) {
    this.authService
      .askForPermission(token)
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
