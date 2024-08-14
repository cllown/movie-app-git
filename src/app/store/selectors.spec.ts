import * as fromSelectors from './selectors';
import { mockState } from '../mocks/movie-mocks';

describe('Selectors', () => {
  it('should select popular movies', () => {
    const result = fromSelectors.selectPopularMovies.projector(mockState);
    expect(result).toEqual(mockState.popularMovies);
  });

  it('should select now playing movies', () => {
    const result = fromSelectors.selectNowPlayingMovies.projector(mockState);
    expect(result).toEqual(mockState.nowPlayingMovies);
  });

  it('should select top rated movies', () => {
    const result = fromSelectors.selectTopRatedMovies.projector(mockState);
    expect(result).toEqual(mockState.topRatedMovies);
  });

  it('should select upcoming movies', () => {
    const result = fromSelectors.selectUpcomingMovies.projector(mockState);
    expect(result).toEqual(mockState.upcomingMovies);
  });

  it('should select all movies', () => {
    const result = fromSelectors.selectAllMovies.projector(
      mockState.popularMovies ?? [],
      mockState.nowPlayingMovies ?? [],
      mockState.topRatedMovies ?? [],
      mockState.upcomingMovies ?? []
    );

    expect(result).toEqual([
      ...(mockState.popularMovies ?? []),
      ...(mockState.nowPlayingMovies ?? []),
      ...(mockState.topRatedMovies ?? []),
      ...(mockState.upcomingMovies ?? []),
    ]);
  });

  it('should select selected movie', () => {
    const result = fromSelectors.selectSelectedMovie.projector(mockState);
    expect(result).toEqual(mockState.selectedMovie);
  });

  it('should select favourite movies', () => {
    const result = fromSelectors.selectFavouriteMovies.projector(mockState);
    expect(result).toEqual(mockState.favouriteMovies);
  });

  it('should select watch list movies', () => {
    const result = fromSelectors.selectWatchListMovies.projector(mockState);
    expect(result).toEqual(mockState.watchListMovies);
  });

  it('should select username', () => {
    const result = fromSelectors.selectUsername.projector(mockState);
    expect(result).toEqual(mockState.username);
  });

  it('should select password', () => {
    const result = fromSelectors.selectPassword.projector(mockState);
    expect(result).toEqual(mockState.password);
  });

  it('should select isLoggedIn', () => {
    const result = fromSelectors.selectIsLoggedIn.projector(mockState);
    expect(result).toEqual(mockState.isLoggedIn);
  });

  it('should select loading', () => {
    const result = fromSelectors.selectLoading.projector(mockState);
    expect(result).toEqual(mockState.loading);
  });

  it('should select isPopupVisible', () => {
    const result = fromSelectors.selectIsPopupVisible.projector(mockState);
    expect(result).toEqual(mockState.isPopupVisible);
  });

  it('should select error', () => {
    const result = fromSelectors.selectError.projector(mockState);
    expect(result).toEqual(mockState.error);
  });

  it('should select searching movies', () => {
    const result = fromSelectors.selectSearchingMovies.projector(mockState);
    expect(result).toEqual(mockState.searchResults);
  });

  it('should select genres', () => {
    const result = fromSelectors.selectGenres.projector(mockState);
    expect(result).toEqual(mockState.genres);
  });

  it('should select filtered movies', () => {
    const result = fromSelectors.selectFilteredMovies.projector(mockState);
    expect(result).toEqual(mockState.filteredMovies);
  });
});
