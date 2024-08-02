import { Routes } from '@angular/router';
import { DetailsMoviePageComponent } from './pages/details-movie-page/details-movie-page.component';
import { NowPlayingMoviesPageComponent } from './pages/now-playing-movies-page/now-playing-movies-page.component';
import { TopRatedMoviesPageComponent } from './pages/top-rated-movies-page/top-rated-movies-page.component';
import { PopularMoviesPageComponent } from './pages/popular-movies-page/popular-movies-page.component';
import { UpcomingMoviesPageComponent } from './pages/upcoming-movies-page/upcoming-movies-page.component';
import { FavouritesMoviesPageComponent } from './pages/favourites-movies-page/favourites-movies-page.component';
import { WatchListMoviesPageComponent } from './pages/watch-list-movies-page/watch-list-movies-page.component';
import { MovieResolver } from './guards/movie.resolver';

export const routes: Routes = [
  { path: '', component: PopularMoviesPageComponent, resolve: {data: MovieResolver}},
  { path: 'movie/:id', component: DetailsMoviePageComponent, resolve: {data: MovieResolver} },
  { path: 'now-playing', component: NowPlayingMoviesPageComponent, resolve: {data: MovieResolver} },
  { path: 'top-rated', component: TopRatedMoviesPageComponent, resolve: {data: MovieResolver} },
  { path: 'upcoming', component: UpcomingMoviesPageComponent, resolve: {data: MovieResolver} },
  { path: 'favourites', component: FavouritesMoviesPageComponent, resolve: {data: MovieResolver} },
  { path: 'watch-list', component: WatchListMoviesPageComponent, resolve: {data: MovieResolver} },
];
