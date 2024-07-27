import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PopularMoviesPageComponent } from './pages/popular-movies-page/popular-movies-page.component';
import { TopRatedMoviesPageComponent } from './pages/top-rated-movies-page/top-rated-movies-page.component';
import { UpcomingMoviesPageComponent } from './pages/upcoming-movies-page/upcoming-movies-page.component';
import { DetailsMoviePageComponent } from './pages/details-movie-page/details-movie-page.component';
import { NowPlayingMoviesPageComponent } from './pages/now-playing-movies-page/now-playing-movies-page.component';
import { HeaderComponent } from "./components/header/header.component";
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { MovieService } from './services/movie/movie.service';

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
    ]
})
export class AppComponent implements OnInit{
    constructor(private authService: AuthService, private movieService: MovieService) {}

    ngOnInit(){
        this.authService.authenticateAndGetAccountId().subscribe(
            accountId => {
                this.movieService.setAccountId(accountId);
                console.log('Account ID:', accountId);
            },
            error => {
                console.error('Authentication failed:', error);
            }
        );
    }
    
}
