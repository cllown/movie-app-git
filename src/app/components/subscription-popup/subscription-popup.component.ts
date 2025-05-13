import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import * as MovieActions from '../../store/actions';
import { selectIsSubscriptionPopupVisible } from '../../store/selectors';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-subscription-popup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    FloatLabelModule,
    DialogModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './subscription-popup.component.html',
  styleUrl: './subscription-popup.component.scss',
})
export class SubscriptionPopupComponent {
  isVisible: boolean = false;
  private subscription: Subscription | undefined;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select(selectIsSubscriptionPopupVisible)
      .subscribe((visible) => {
        this.isVisible = visible;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onCancel(): void {
    this.store.dispatch(MovieActions.closeSubscriptionPopup());
  }
}
