import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { STRINGS } from '../../../configs/strings';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomerAuthService } from '../../../services/customer/customer-auth.service';

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
  selector: 'app-customer-login',
  standalone: true,
  imports: [...MatModules, ReactiveFormsModule, RouterModule],
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.scss',
})
export class CustomerLoginComponent {
  // strings to show in the component
  appStrings: any = STRINGS;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  hide = signal(true);

  constructor(private customerAuthService: CustomerAuthService) {
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  get username() {
    return this.loginForm.get('username')
  }

  get password() {
    return this.loginForm.get('password')
  }

  login() {
    const payload = {
      username: this.username?.value ?? '',
      password: this.password?.value,
    };
    console.log(payload)
    this.loginForm.reset()
    // this.customerAuthService.login(payload).subscribe(
    //   (response) => {
    //     localStorage.setItem('access_token', response.access);
    //     localStorage.setItem('refresh_token', response.refresh);
    //     console.log('Logged in successfully');
    //   },
    //   (error) => {
    //     console.error('Login failed', error);
    //   }
    // );
  }
}
