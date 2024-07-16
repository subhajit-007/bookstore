import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { STRINGS } from '../../configs/strings';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CustomerAuthService } from '../../services/customer/customer-auth.service';
import { Observable, of } from 'rxjs';

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
export class NavbarComponent implements OnInit, AfterViewInit {
  // strings to show in the component
  appStrings: any = STRINGS;

  @Input() role: string = 'admin';

  isAuthScreen: boolean = false;

  isUserLoggedIn$: Observable<boolean> = of(false);

  constructor(private router: Router, private changes: ChangeDetectorRef, private customerAuthService: CustomerAuthService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkIfAuthScreen(event.urlAfterRedirects);
      }
    });
    this.isLoggedIn();
  }

  ngAfterViewInit(): void {
    this.checkIfAuthScreen(this.router.url);
  }

  checkIfAuthScreen(url: string): void {
    const regexForAuthUrl = /(\/login|\/signup)/g;
    let matchFoundArr = url.match(regexForAuthUrl) ?? []
    this.isAuthScreen = matchFoundArr.length >= 1;
    this.changes.detectChanges();
  }

  // Checks user logged in or not
  isLoggedIn(): void {
    this.isUserLoggedIn$ = this.customerAuthService.isLoggedIn();
  }

  getToken(): string | null {
    return localStorage.getItem("Authorization");
  }

  logout() {
    this.customerAuthService.logout().subscribe({
        next: (res: any) => {
          console.log("Logout response => \n", res)
          alert("Successfully Logout")
        },
        error: (err: any) => {
          console.log("Logout error => \n",err)
        }
      }
    )
  }

  // if user is "customer" and logged in then only show cart option
  isCartVisiable(): boolean {
    return this.role === 'customer';
  }
}
