import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BooksService } from '../../../services/customer/books.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

const MatModules = [
  MatButtonModule,
  MatCardModule,
];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [...MatModules, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  books: any[] = [];

  constructor(private bookService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data: any[]) => {
      this.books = data;
    });
  }

  goToBookDetail(bookId: string): void {
    console.log("bookId: ", bookId)
    this.router.navigate(['/user/book-detail', bookId]);
  }
}
