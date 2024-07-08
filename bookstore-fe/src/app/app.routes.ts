import { Routes } from '@angular/router';
import { DashboardComponent as CustomerDashboardComponent } from './screens/customer/dashboard/dashboard.component';
import { DashboardComponent as OwnerDashboardComponent } from './screens/bookOwner/dashboard/dashboard.component';
import { PageNotFoundComponent } from './screens/shared/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirect empty path to customer dashboard
  { path: 'dashboard', component: CustomerDashboardComponent },
  { path: 'book-owner/dashboard', component: OwnerDashboardComponent },
  // other routes go here
  { path: '**', component: PageNotFoundComponent }, // This should be the last route
];
