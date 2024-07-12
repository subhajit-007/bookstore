import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { STRINGS } from '../../../configs/strings';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { BookOwnerAuthService } from '../../../services/book-owner/book-owner-auth.service';

const MatModules = [
  MatToolbarModule,
  MatLabel,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
];

@Component({
  selector: 'app-owner-login',
  standalone: true,
  imports: [...MatModules, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './owner-login.component.html',
  styleUrl: './owner-login.component.scss',
})
export class OwnerLoginComponent {
  // strings to show in the component
  appStrings: any = STRINGS;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  hide = signal(true);

  constructor(private bookOwnerAuthService: BookOwnerAuthService) {}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    const payload = {
      username: this.username?.value ?? '',
      password: this.password?.value,
    };
    console.log(payload);
    this.loginForm.reset();
  }
}
