import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterModule } from '@angular/router';
import { BookOwnerAuthService } from '../../../services/book-owner/book-owner-auth.service';
import { BooksService } from '../../../services/customer/books.service';

const MatModules = [
  MatToolbarModule,
  MatLabel,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatDividerModule,
];
@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [...MatModules, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss',
})
export class OrdersListComponent implements OnInit {
  orders: any[] = [];

  // private defaultThumbnailUrl: string =
  //   'http://dummyimage.com/332x377.png/dddddd/000000';

  constructor(
    private bookOwnerAuthService: BookOwnerAuthService,
    private booksService: BooksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookOwnerAuthService.getOrders().subscribe({
      next: (res) => {
        this.orders = res?.data?.map((item: any) => ({
          id: parseInt(item.id, 10),
          customer: parseInt(item.relationships.customer.data.id, 10),
          book: parseInt(item.relationships.book.data.id, 10),
          attributes: {
            ...item.attributes,
          },
        }));
        console.log(this.orders);
      },
      error: (err) => {
        console.log('Error while fetching orders...', err);
      },
    });
  }

  fetchOrderDetail(orderId: Number): void {
    console.log(`order fetched for id: ${orderId}`);
  }
}
