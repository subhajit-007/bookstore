import { Component, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
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
import { numberValidator } from '../../../form-validators/number-validator';
import { passwordValidator } from '../../../form-validators/password-validator';

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
    phone_number: new FormControl('', [Validators.required, numberValidator()]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password: new FormControl('', [Validators.required, passwordValidator]),
  });

  hide = signal(true);

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
      first_name: this.first_name?.value ?? '',
      last_name: this.last_name?.value ?? '',
      email: this.email?.value ?? '',
      phone_number: this.phone_number?.value ?? '',
      address: this.address?.value ?? '',
      password: this.password?.value,
      role: 3,
    };
    console.log(payload);

    // if (this.signupForm.valid) {
    //   this.customerAuthService.signup(payload).subscribe({
    //     next: (response) => {
    //       console.log('Signup successful -> \n', response);
    //       console.warn('Signup successful', response);
    //     },
    //     error: (error) => {
    //       console.error('Signup error -> ', error);
    //     },
    //     complete: () => console.info('complete'),
    //   });
    // }
  }
}
