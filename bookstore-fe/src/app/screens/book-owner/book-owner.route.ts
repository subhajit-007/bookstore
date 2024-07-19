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
    path: 'manage-orders',
    loadComponent: () =>
      import('./orders-list/orders-list.component').then(
        (comp) => comp.OrdersListComponent
      ),
  },
  {
    path: ':orderId/manage',
    loadComponent: () =>
      import('./manage-order/manage-order.component').then(
        (comp) => comp.ManageOrderComponent
      ),
  },
  {
    path: 'add-book',
    loadComponent: () =>
      import('./add-book/add-book.component').then(
        (comp) => comp.AddBookComponent
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
