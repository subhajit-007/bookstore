import { Component } from '@angular/core';
import { STRINGS } from '../../configs/strings';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  // strings to show in the component
  appStrings: any = STRINGS;

}
