import { Route } from '@angular/router';

export const CUSTOMER_ROUTE: Route[] = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (comp) => comp.DashboardComponent
      ),
  },
  {
    path: 'book-detail/:bookId',
    loadComponent: () =>
      import('./book-detail/book-detail.component').then(
        (comp) => comp.BookDetailComponent
      ),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./orders/orders.component').then((comp) => comp.OrdersComponent),
  },
  {
    path: 'order-detail/:orderId',
    loadComponent: () =>
      import('./order-detail/order-detail.component').then(
        (comp) => comp.OrderDetailComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./customer-login/customer-login.component').then(
        (comp) => comp.CustomerLoginComponent
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./customer-signup/customer-signup.component').then(
        (comp) => comp.CustomerSignupComponent
      ),
  },
];
