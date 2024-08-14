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
import { LoginPopupComponent } from './components/login-popup/login-popup.component';
import { MenubarComponent } from "./components/menubar/menubar.component";
import { NewsSubscriptionComponent } from "./components/news-subscription/news-subscription.component";

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
    LoginPopupComponent,
    MenubarComponent,
    NewsSubscriptionComponent
],
})
export class AppComponent extends ClearObservable implements OnInit {
  title = 'movie-app';
  
  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit() {}

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
