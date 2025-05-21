import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { map, of } from 'rxjs';
import { MovieCardComponent } from './movie-card.component';
import { MovieService } from '../../services/movie/movie.service';
import { Movie } from '../../models/movie';
import { RatingRoundingPipe } from '../../pipes/rating-rounding/rating-rounding.pipe';
import { MovieState } from '../../store/state';
import * as MovieActions from '../../store/actions';
import { mockGenres, mockMovie, mockState } from '../../mocks/movie-mocks';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let store: Store<MovieState>;
  let movieService: jest.Mocked<MovieService>;

  beforeEach(async () => {
    const movieServiceMock = {
      getGenreNames: jest.fn().mockReturnValue(of(mockGenres)),
      checkIfMovieInList: jest.fn((movieId: number, movies$: any) =>
        movies$.pipe(
          map(
            (movies: Movie[] | null) =>
              movies?.some((movie) => movie.id === movieId) || false
          )
        )
      ),
    };

    await TestBed.configureTestingModule({
      declarations: [MovieCardComponent, RatingRoundingPipe],
      imports: [
        StoreModule.forRoot({
          movie: (state: MovieState = mockState) => state,
        }),
      ],
      providers: [{ provide: MovieService, useValue: movieServiceMock }],
    }).compileComponents();

    store = TestBed.inject(Store);
    movieService = TestBed.inject(MovieService) as jest.Mocked<MovieService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    component.movie = mockMovie;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display movie title', () => {
    const titleElement = fixture.nativeElement.querySelector('.original_title');
    expect(titleElement.textContent).toContain(mockMovie.title);
  });

  it('should call openLoginPopup when not logged in and trying to add to favourites', () => {
    store.dispatch(MovieActions.loginFailure({ error: 'Not logged in' }));
    const openLoginPopupSpy = jest.spyOn(component as any, 'openLoginPopup');
    component.onAddToFavourites(mockMovie.id);
    expect(openLoginPopupSpy).toHaveBeenCalled();
  });

  it('should dispatch setMovieToFavourites when logged in and trying to add to favourites', () => {
    store.dispatch(
      MovieActions.loginSuccess({
        sessionId: 'mockSessionId',
        username: 'test_user',
      })
    );
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.onAddToFavourites(mockMovie.id);
    expect(dispatchSpy).toHaveBeenCalledWith(
      MovieActions.setMovieToFavourites({ movieId: mockMovie.id })
    );
  });

  it('should call openLoginPopup when not logged in and trying to add to watch list', () => {
    store.dispatch(MovieActions.loginFailure({ error: 'Not logged in' }));
    const openLoginPopupSpy = jest.spyOn(component as any, 'openLoginPopup');
    component.onAddToWatchList(mockMovie.id);
    expect(openLoginPopupSpy).toHaveBeenCalled();
  });

  it('should dispatch setMovieToWatchList when logged in and trying to add to watch list', () => {
    store.dispatch(
      MovieActions.loginSuccess({
        sessionId: 'mockSessionId',
        username: 'test_user',
      })
    );
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.onAddToWatchList(mockMovie.id);
    expect(dispatchSpy).toHaveBeenCalledWith(
      MovieActions.setMovieToWatchList({ movieId: mockMovie.id })
    );
  });

  it('should emit removeFromList event when onRemoveFromList is called', () => {
    const emitSpy = jest.spyOn(component.removeFromList, 'emit');
    component.onRemoveFromList();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should return genre names as comma separated string', () => {
    const genreNames = component.getGenreNames(mockMovie.genre_ids, mockGenres);
    expect(genreNames).toBe('Action, Horror');
  });
});
