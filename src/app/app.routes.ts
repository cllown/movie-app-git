import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailsMoviePageComponent } from './pages/details-movie-page/details-movie-page.component';
import { NowPlayingMoviesPageComponent } from './pages/now-playing-movies-page/now-playing-movies-page.component';
import { TopRatedMoviesPageComponent } from './pages/top-rated-movies-page/top-rated-movies-page.component';
import { PopularMoviesPageComponent } from './pages/popular-movies-page/popular-movies-page.component';
import { UpcomingMoviesPageComponent } from './pages/upcoming-movies-page/upcoming-movies-page.component';
import { FavouritesMoviesPageComponent } from './pages/favourites-movies-page/favourites-movies-page.component';
import { WatchListMoviesPageComponent } from './pages/watch-list-movies-page/watch-list-movies-page.component';

export const routes: Routes = [
  { path: 'movie/:id', component: DetailsMoviePageComponent },
  { path: 'now-playing', component: NowPlayingMoviesPageComponent },
  { path: 'top-rated', component: TopRatedMoviesPageComponent },
  { path: 'upcoming', component: UpcomingMoviesPageComponent },
  { path: 'popular', component: PopularMoviesPageComponent },

  {
    path: 'favourites',
    component: FavouritesMoviesPageComponent,
    outlet: 'header',
  },
  {
    path: 'watch-list',
    component: WatchListMoviesPageComponent,
    outlet: 'header',
  },
];
