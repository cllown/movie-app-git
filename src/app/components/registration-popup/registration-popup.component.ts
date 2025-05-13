import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import * as MovieActions from '../../store/actions';
import { selectIsRegisterPopupVisible } from '../../store/selectors';

@Component({
  selector: 'app-registration-popup',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './registration-popup.component.html',
  styleUrl: './registration-popup.component.scss',
})
export class RegistrationPopupComponent implements OnInit {
  formGroup!: FormGroup;
  isVisible: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.store.select(selectIsRegisterPopupVisible).subscribe((visible) => {
      this.isVisible = visible ?? false;
      if (!this.isVisible) {
        this.formGroup.reset();
        this.error = null;
      }
    });
  }

  onRegister(): void {
    const { username, password } = this.formGroup.value;
    const userExists = localStorage.getItem(username);

    if (!userExists) {
      localStorage.setItem(username, password);
      this.error = null;
      this.store.dispatch(MovieActions.login({ username, password }));
      this.onClose();
    } else {
      this.error = 'Користувач вже існує';
    }
  }

  onClose(): void {
    this.store.dispatch(MovieActions.closeRegisterPopup());
    this.formGroup.reset();
  }
}
