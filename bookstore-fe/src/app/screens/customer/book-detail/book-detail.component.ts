import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BooksService } from '../../../services/customer/books.service';
import { MatChipsModule } from '@angular/material/chips';

const MatModules = [
  MatButtonModule,
  MatCardModule,
  MatChipsModule
];


@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [...MatModules, CommonModule, RouterModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
})
export class BookDetailComponent implements OnInit {
  bookId: string = '';
  book: any;

  constructor(private route: ActivatedRoute, private booksService: BooksService) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('bookId') ?? '';
    console.log(this.bookId)
    this.booksService.getBookById(this.bookId).subscribe((data) => {
      this.book = data;
      console.log("book -> ", this.book)
    });
    this.booksService.getBookStoreName(this.book?.book_store_id).subscribe((book_store_name) => {
      this.book = {
        ...this.book,
        book_store_name
      };
      console.log("book -> ", this.book)
    });
  }

  isBookAval(): boolean{
    console.log("--")
    return this.book?.quantity_aval > 0
  }
}
