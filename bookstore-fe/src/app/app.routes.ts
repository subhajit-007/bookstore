import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './screens/shared/page-not-found/page-not-found.component';
import { CustomerComponent } from './screens/customer/customer.component';
import { BookOwnerComponent } from './screens/book-owner/book-owner.component';

export const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  {
    path: 'user',
    component: CustomerComponent,
    loadChildren: () =>
      import('./screens/customer/customer.route').then((m) => m.CUSTOMER_ROUTE),
  },
  {
    path: 'book-owner',
    component: BookOwnerComponent,
    loadChildren: () =>
      import('./screens/book-owner/book-owner.route').then(
        (m) => m.BOOK_OWNER_ROUTE
      ),
  },
  { path: '**', component: PageNotFoundComponent }, // This should be the last route
];
