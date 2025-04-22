import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { ClearObservable } from '../../models/clear-observable';
import { catchError, Observable, of, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Genre } from '../../models/movie';
import { select, Store } from '@ngrx/store';
import { selectGenres } from '../../store/selectors';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-news-subscription',
  standalone: true,
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    CalendarModule,
    CheckboxModule,
    MultiSelectModule,
    CommonModule,
  ],
  templateUrl: './news-subscription.component.html',
  styleUrl: './news-subscription.component.scss',
})
export class NewsSubscriptionComponent
  extends ClearObservable
  implements OnInit
{
  formGroup!: FormGroup;
  genres$!: Observable<Genre[] | null>;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.genres$ = this.store.pipe(select(selectGenres));
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: [null, Validators.required],
      selectedGenres: [[], Validators.required],
      consent: [false, Validators.requiredTrue],
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      // Применение класса 'ng-invalid' к невалидным полям
      this.formGroup.markAllAsTouched();
      return;
    }

    const subscriptionData = this.formGroup.value;

    this.simulateSubscription(subscriptionData)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.errorMessage =
            'There was an error processing your request. Please try again.';
          return of(null);
        })
      )
      .subscribe(() => {
        this.successMessage = 'You have been subscribed successfully!';
        this.formGroup.reset();
      });
  }

  onUnsubscribe() {
    if (this.formGroup.invalid) {
      // Применение класса 'ng-invalid' к невалидным полям
      this.formGroup.markAllAsTouched();
      return;
    }

    const subscriptionData = this.formGroup.value;

    this.simulateUnsubscription(subscriptionData)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.errorMessage =
            'There was an error processing your request. Please try again.';
          return of(null);
        })
      )
      .subscribe(() => {
        this.successMessage = 'You have been unsubscribed successfully!';
        this.formGroup.reset();
      });
  }

  private simulateSubscription(data: any) {
    console.log('Simulating subscription', data);
    return of(data);
  }

  private simulateUnsubscription(data: any) {
    console.log('Simulating unsubscription', data);
    return of(null);
  }
}
