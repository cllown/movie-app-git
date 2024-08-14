import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesSortingComponent } from './movies-sorting.component';

describe('MoviesSortingComponent', () => {
  let component: MoviesSortingComponent;
  let fixture: ComponentFixture<MoviesSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesSortingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviesSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
