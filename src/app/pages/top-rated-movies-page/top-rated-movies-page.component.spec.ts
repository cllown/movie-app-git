import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedMoviesPageComponent } from './top-rated-movies-page.component';

describe('TopRatedMoviesPageComponent', () => {
  let component: TopRatedMoviesPageComponent;
  let fixture: ComponentFixture<TopRatedMoviesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRatedMoviesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopRatedMoviesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
