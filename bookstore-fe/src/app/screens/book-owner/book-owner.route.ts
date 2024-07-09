import { Route } from '@angular/router';

export const BOOK_OWNER_ROUTE: Route[] = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./owner-dashboard/owner-dashboard.component').then(
        (comp) => comp.OwnerDashboardComponent
      ),
  },
  {
    path: 'manage-order/:orderId',
    loadComponent: () =>
      import('./manage-order/manage-order.component').then(
        (comp) => comp.ManageOrderComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./owner-login/owner-login.component').then(
        (comp) => comp.OwnerLoginComponent
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./owner-signup/owner-signup.component').then(
        (comp) => comp.OwnerSignupComponent
      ),
  },
];
