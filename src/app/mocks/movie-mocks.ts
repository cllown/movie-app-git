import { Genre, Movie, MovieApiModel } from '../models/movie';
import {
  CreateSessionIdResponse,
  PermissionResponse,
  RequestTokenResponse,
} from '../models/responce.inetrface';
import { MovieState } from '../store/state';

export const mockMovies: Movie[] = [
  {
    adult: false,
    backdrop_path: '/path/to/backdrop.jpg',
    genre_ids: [28, 12],
    id: 1,
    original_language: 'en',
    original_title: 'Movie 1',
    overview: 'Overview of Movie 1',
    popularity: 10.0,
    poster_path: '/path/to/poster.jpg',
    release_date: '2024-08-01',
    title: 'Movie 1',
    video: false,
    vote_average: 8.5,
    vote_count: 100,
  },
  {
    adult: false,
    backdrop_path: '/path/to/another_backdrop.jpg',
    genre_ids: [35, 18],
    id: 2,
    original_language: 'fr',
    original_title: 'Movie 2',
    overview: 'Overview of Movie 2',
    popularity: 7.5,
    poster_path: '/path/to/another_poster.jpg',
    release_date: '2024-07-15',
    title: 'Movie 2',
    video: false,
    vote_average: 7.0,
    vote_count: 50,
  },
];

export const mockMovieApiResponse: MovieApiModel = {
  page: 1,
  total_results: mockMovies.length,
  total_pages: 1,
  results: mockMovies,
};

export const mockMovie: Movie = {
  adult: false,
  backdrop_path: '/path/to/backdrop.jpg',
  genre_ids: [28, 12],
  id: 1,
  original_language: 'en',
  original_title: 'Movie 1',
  overview: 'Movie Overview 1',
  popularity: 7.5,
  poster_path: '/path/to/poster1.jpg',
  release_date: '2024-08-01',
  title: 'Movie 1',
  video: false,
  vote_average: 8.0,
  vote_count: 100,
};

export const mockMovie2: Movie = {
  adult: false,
  backdrop_path: '/path/to/backdrop.jpg',
  genre_ids: [28, 12],
  id: 2,
  original_language: 'en',
  original_title: 'Movie 2',
  overview: 'Movie Overview 2',
  popularity: 7.5,
  poster_path: '/path/to/poster2.jpg',
  release_date: '2024-08-01',
  title: 'Movie 2',
  video: false,
  vote_average: 8.0,
  vote_count: 100,
};

export const mockRequestTokenResponse: RequestTokenResponse = {
  request_token: 'requestToken',
  success: true,
  expires_at: '2024-08-01T00:00:00Z',
};

export const mockCreateSessionIdResponse: CreateSessionIdResponse = {
  session_id: 'sessionId',
  success: true,
};

export const mockPermissionResponse: PermissionResponse = {
  request_token: 'requestToken',
  success: true,
};

export const mockGenres: Genre[] = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Horror' },
];

export const mockState: MovieState = {
  recomendationMovies: mockMovies,
  popularMovies: mockMovies,
  nowPlayingMovies: mockMovies,
  topRatedMovies: mockMovies,
  upcomingMovies: mockMovies,
  selectedMovie: mockMovie,
  favouriteMovies: mockMovies,
  watchListMovies: mockMovies,
  username: 'testuser',
  password: 'password123',
  isLoggedIn: true,
  loading: false,
  isPopupVisible: true,
  error: null,
  searchError: null,
  searchResults: mockMovies,
  genres: mockGenres,
  filteredMovies: mockMovies,
  isMoodRecommendationPopupVisible: false,
  registerError: null,
  isRegistering: false,
  isSubscriptionPopupVisible: false,
  customLists: [],
};
