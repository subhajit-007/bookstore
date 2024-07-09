import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-book-owner',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './book-owner.component.html',
  styleUrl: './book-owner.component.scss'
})
export class BookOwnerComponent {

}
