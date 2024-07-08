import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
// import { NavbarComponent } from './navbar/navbar.component';

const MatModules = [
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
]

@NgModule({
  declarations: [
    AppComponent,
    // NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    [...MatModules]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
