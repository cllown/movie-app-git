import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as MovieActions from './actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MovieService } from '../services/movie/movie.service';

@Injectable()
export class MovieEffects {
  loadPopularMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadPopularMovies),
      mergeMap(() => {
        return this.movieService.getPopularMovies().pipe(
          map((movies) =>
            MovieActions.loadPopularMoviesSuccess({ movies: movies.results })
          ),
          catchError((error) =>
            of(MovieActions.loadPopularMoviesFailure({ error }))
          )
        );
      })
    )
  );

  loadNowPlayingMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadNowPlayingMovies),
      mergeMap(() => {
        return this.movieService.getNowPlayingMovies().pipe(
          map((movies) =>
            MovieActions.loadNowPlayingMoviesSuccess({ movies: movies.results })
          ),
          catchError((error) =>
            of(MovieActions.loadNowPlayingMoviesFailure({ error }))
          )
        );
      })
    )
  );

  loadTopRatedMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadTopRatedMovies),
      mergeMap(() => {
        return this.movieService.getTopRatedMovies().pipe(
          map((movies) =>
            MovieActions.loadTopRatedMoviesSuccess({ movies: movies.results })
          ),
          catchError((error) =>
            of(MovieActions.loadTopRatedMoviesFailure({ error }))
          )
        );
      })
    )
  );

  loadUpcomingMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadUpcomingMovies),
      mergeMap(() => {
        return this.movieService.getUpcomingMovies().pipe(
          map((movies) =>
            MovieActions.loadUpcomingMoviesSuccess({ movies: movies.results })
          ),
          catchError((error) =>
            of(MovieActions.loadUpcomingMoviesFailure({ error }))
          )
        );
      })
    )
  );

  loadMovieDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadMovieDetails),
      mergeMap((action) => {
        return this.movieService.getMovieDetails(action.movieId).pipe(
          map((movie) => {
            return MovieActions.loadMovieDetailsSuccess({ movie });
          }),
          catchError((error) => {
            return of(MovieActions.loadMovieDetailsFailure({ error }));
          })
        );
      })
    )
  );

  loadFavouriteMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadFavouriteMovies),
      mergeMap(() => {
        return this.movieService.getFavouriteMovies().pipe(
          map((movies) =>
            MovieActions.loadFavouriteMoviesSuccess({ movies: movies })
          ),
          catchError((error) =>
            of(MovieActions.loadFavouriteMoviesFailure({ error }))
          )
        );
      })
    )
  );

  loadWatchListMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadWatchListMovies),
      mergeMap(() => {
        return this.movieService.getWatchListMovies().pipe(
          map((movies) =>
            MovieActions.loadWatchListMoviesSuccess({ movies: movies })
          ),
          catchError((error) =>
            of(MovieActions.loadWatchListMoviesFailure({ error }))
          )
        );
      })
    )
  );

  setMovieToFavourites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.setMovieToFavourites),
      mergeMap((action) =>
        this.movieService.updateList('favorite', action.movieId, true).pipe(
          map(() => MovieActions.loadFavouriteMovies()),
          catchError((error) =>
            of(MovieActions.loadFavouriteMoviesFailure({ error }))
          )
        )
      )
    )
  );

  removeMovieFromFavourites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.removeMovieFromFavourites),
      mergeMap((action) =>
        this.movieService.updateList('favorite', action.movieId, false).pipe(
          map(() => MovieActions.loadFavouriteMovies()),
          catchError((error) =>
            of(MovieActions.loadFavouriteMoviesFailure({ error }))
          )
        )
      )
    )
  );

  setMovieToWatchList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.setMovieToWatchList),
      mergeMap((action) =>
        this.movieService.updateList('watchlist', action.movieId, true).pipe(
          map(() => MovieActions.loadWatchListMovies()),
          catchError((error) =>
            of(MovieActions.loadWatchListMoviesFailure({ error }))
          )
        )
      )
    )
  );

  removeMovieFromWatchList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.removeMovieFromWatchList),
      mergeMap((action) =>
        this.movieService.updateList('watchlist', action.movieId, false).pipe(
          map(() => MovieActions.loadWatchListMovies()),
          catchError((error) =>
            of(MovieActions.loadWatchListMoviesFailure({ error }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private movieService: MovieService) {}
}
