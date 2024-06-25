import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMoviePageComponent } from './details-movie-page.component';

describe('DetailsMoviePageComponent', () => {
  let component: DetailsMoviePageComponent;
  let fixture: ComponentFixture<DetailsMoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsMoviePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsMoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
