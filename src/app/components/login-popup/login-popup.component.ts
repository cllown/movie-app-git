import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectError,
  selectIsPopupVisible,
  selectLoading,
  selectPassword,
  selectUsername,
} from '../../store/selectors';
import * as MovieActions from '../../store/actions';

@Component({
  selector: 'app-login-popup',
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
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
})
export class LoginPopupComponent implements OnInit {
  formGroup!: FormGroup;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  isVisible: boolean = false;

  constructor(private store: Store, private formBuilder: FormBuilder) {
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    combineLatest([
      this.store.select(selectUsername),
      this.store.select(selectPassword),
      this.store.select(selectIsPopupVisible).pipe(map(visible => visible ?? false)),
    ]).pipe(
      map(([username, password, visible]) => {
        if (username) {
          this.formGroup.get('username')?.setValue(username);
        }
        if (password) {
          this.formGroup.get('password')?.setValue(password);
        }
        this.isVisible = visible;
        if (!visible) {
          this.formGroup.reset();
        }
      })
    ).subscribe();
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const { username, password } = this.formGroup.value;
      this.store.dispatch(MovieActions.login({ username, password }));
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.store.dispatch(MovieActions.closeLoginPopup());
  }
}