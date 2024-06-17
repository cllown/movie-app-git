import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PMovieCardComponent } from './p-movie-card.component';

describe('PMovieCardComponent', () => {
  let component: PMovieCardComponent;
  let fixture: ComponentFixture<PMovieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PMovieCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PMovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
