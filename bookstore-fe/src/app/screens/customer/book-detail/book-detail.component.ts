import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
})
export class BookDetailComponent implements OnInit {
  bookId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('bookId') ?? '';
  }
}
