import { Component, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { STRINGS } from '../../../configs/strings';
import { CustomerAuthService } from '../../../services/customer/customer-auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  selector: 'app-customer-signup',
  standalone: true,
  imports: [...MatModules, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './customer-signup.component.html',
  styleUrl: './customer-signup.component.scss',
})
export class CustomerSignupComponent {
  // strings to show in the component
  appStrings: any = STRINGS;

  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      this.passwordValidator,
    ]),
  });

  hide = signal(true);

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const minLength = value.length >= 4;

    const passwordValid =
      hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && minLength;

    return !passwordValid ? { passwordStrength: true } : null;
  }

  constructor(private customerAuthService: CustomerAuthService) {}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  get username() {
    return this.signupForm.get('username');
  }

  get first_name() {
    return this.signupForm.get('first_name');
  }

  get last_name() {
    return this.signupForm.get('last_name');
  }

  get email() {
    return this.signupForm.get('email');
  }
  
  get address() {
    return this.signupForm.get('address');
  }

  get phone_number() {
    return this.signupForm.get('phone_number');
  }

  get password() {
    return this.signupForm.get('password');
  }

  isPasswordValid() {
    return (
      (this.signupForm.get('password')?.errors?.['required'] ||
        this.signupForm.get('password')?.errors?.['passwordStrength']) &&
      (this.password?.dirty || this.password?.touched)
    );
  }

  signup() {
    const payload = {
      username: this.username?.value ?? '',
      password: this.password?.value,
    };
    console.log(payload);
    // this.signupForm.reset()
    // this.customerAuthService.signup(payload).subscribe(
    //   (response) => {
    //     localStorage.setItem('access_token', response.access);
    //     localStorage.setItem('refresh_token', response.refresh);
    //     console.log('Logged in successfully');
    //   },
    //   (error) => {
    //     console.error('signup failed', error);
    //   }
    // );
  }
}
