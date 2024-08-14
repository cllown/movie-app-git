import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSubscriptionComponent } from './news-subscription.component';

describe('NewsSubscriptionComponent', () => {
  let component: NewsSubscriptionComponent;
  let fixture: ComponentFixture<NewsSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsSubscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
