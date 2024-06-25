import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchListMoviesPageComponent } from './watch-list-movies-page.component';

describe('WatchListMoviesPageComponent', () => {
  let component: WatchListMoviesPageComponent;
  let fixture: ComponentFixture<WatchListMoviesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchListMoviesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WatchListMoviesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
