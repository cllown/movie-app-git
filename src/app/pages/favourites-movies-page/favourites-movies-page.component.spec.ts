import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesMoviesPageComponent } from './favourites-movies-page.component';

describe('FavouritesMoviesPageComponent', () => {
  let component: FavouritesMoviesPageComponent;
  let fixture: ComponentFixture<FavouritesMoviesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritesMoviesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavouritesMoviesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
