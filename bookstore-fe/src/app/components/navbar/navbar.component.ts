import { Component, Input } from '@angular/core';
import { STRINGS } from '../../configs/strings';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

const MatModules = [
  MatToolbarModule,
  MatLabel,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
];

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [...MatModules, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  // strings to show in the component
  appStrings: any = STRINGS;

  @Input() role: string = 'admin';

  // Checks user logged in or not
  isLoggedIn(): boolean {
    return false;
  }

  // if user is "customer" and logged in then only show cart option
  isCartVisiable(): boolean {
    return this.role === 'customer' && this.isLoggedIn();
  }
}
