import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { BooksService } from '../../../services/customer/books.service';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

const MatModules = [
  MatToolbarModule,
  MatLabel,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
];
@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [
    ...MatModules,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    NavbarComponent,
  ],
  templateUrl: './owner-dashboard.component.html',
  styleUrl: './owner-dashboard.component.scss',
})
export class OwnerDashboardComponent implements OnInit {
  books: any[] = [];

  constructor(private bookService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data: any[]) => {
      this.books = data;
    });
  }

  goToBookDetail(bookId: string): void {
    console.log('bookId: ', bookId);
    this.router.navigate(['/user/book-detail', bookId]);
  }
}
