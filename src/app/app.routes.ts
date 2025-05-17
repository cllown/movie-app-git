import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PopularMoviesResolver } from './guards/popular-movies.resolver';
import { MovieDetailsResolver } from './guards/movie-details.resolver';
import { NowPlayingMoviesResolver } from './guards/now-playing-movies.resolver';
import { TopRatedMoviesResolver } from './guards/top-rated-movies.resolver';
import { UpcomingMoviesResolver } from './guards/upcoming-movies.resolver';
import { AllMoviesResolver } from './guards/all-movies.resolver';
import { profilePageResolver } from './guards/profile-page-resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/all-movies-page/all-movies-page.component').then(
        (m) => m.AllMoviesPageComponent
      ),
    resolve: { data: AllMoviesResolver },
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile-page/profile-page.component').then(
        (m) => m.ProfilePageComponent
      ),
    canActivate: [AuthGuard],
    resolve: { data: profilePageResolver },
  },
  {
    path: 'popular',
    loadComponent: () =>
      import('./pages/popular-movies-page/popular-movies-page.component').then(
        (m) => m.PopularMoviesPageComponent
      ),
    resolve: { data: PopularMoviesResolver },
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./pages/details-movie-page/details-movie-page.component').then(
        (m) => m.DetailsMoviePageComponent
      ),
    resolve: { data: MovieDetailsResolver },
  },
  {
    path: 'now-playing',
    loadComponent: () =>
      import(
        './pages/now-playing-movies-page/now-playing-movies-page.component'
      ).then((m) => m.NowPlayingMoviesPageComponent),
    resolve: { data: NowPlayingMoviesResolver },
  },
  {
    path: 'top-rated',
    loadComponent: () =>
      import(
        './pages/top-rated-movies-page/top-rated-movies-page.component'
      ).then((m) => m.TopRatedMoviesPageComponent),
    resolve: { data: TopRatedMoviesResolver },
  },
  {
    path: 'upcoming',
    loadComponent: () =>
      import(
        './pages/upcoming-movies-page/upcoming-movies-page.component'
      ).then((m) => m.UpcomingMoviesPageComponent),
    resolve: { data: UpcomingMoviesResolver },
  },
  {
    path: 'favourites',
    loadComponent: () =>
      import(
        './pages/favourites-movies-page/favourites-movies-page.component'
      ).then((m) => m.FavouritesMoviesPageComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'watch-list',
    loadComponent: () =>
      import(
        './pages/watch-list-movies-page/watch-list-movies-page.component'
      ).then((m) => m.WatchListMoviesPageComponent),
    canActivate: [AuthGuard],
  },
];
