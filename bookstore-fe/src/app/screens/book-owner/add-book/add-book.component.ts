import { Component, OnInit, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { STRINGS } from '../../../configs/strings';
import { BookOwnerAuthService } from '../../../services/book-owner/book-owner-auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BooksService } from '../../../services/customer/books.service';

const MatModules = [
  MatToolbarModule,
  MatLabel,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
];

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [...MatModules, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent implements OnInit {
  // strings to show in the component
  appStrings: any = STRINGS;

  user_data: any;

  bookEntryForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', []),
    price: new FormControl('', [Validators.required]),
    rating: new FormControl('0', []),
    thumbnail: new FormControl('', []),
    quantity_aval: new FormControl('', [Validators.required]),
    book_owner: new FormControl({}, []),
  });

  // hide = signal(true);

  constructor(
    private bookOwnerAuthService: BookOwnerAuthService,
    private booksService: BooksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookOwnerAuthService.getBookOwner().subscribe({
      next: (res) => {
        // console.log(res);
        this.user_data = {
          id: res?.data?.id ?? '',
          ...res.data.attributes,
        };
        console.log(this.user_data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // clickEvent(event: MouseEvent) {
  //   this.hide.set(!this.hide());
  //   event.stopPropagation();
  // }

  get title() {
    return this.bookEntryForm.get('title');
  }
  get author() {
    return this.bookEntryForm.get('author');
  }
  get price() {
    return this.bookEntryForm.get('price');
  }
  get rating() {
    return this.bookEntryForm.get('rating');
  }
  get thumbnail() {
    return this.bookEntryForm.get('thumbnail');
  }
  get quantity_aval() {
    return this.bookEntryForm.get('quantity_aval');
  }

  addBook(): void {
    const payload = {
      title: this.title?.value ?? '',
      author: this.author?.value,
      price: this.price?.value,
      thumbnail: this.thumbnail?.value ?? '',
      quantity_aval: this.quantity_aval?.value ?? '0',
      book_owner: Number(this.user_data.id),
    };
    // console.log(payload);
    this.booksService.addNewBook(payload).subscribe({
      next: (res) => {
        // console.log(res)
        alert('New Book Added Successfully');
        this.router.navigate(['../book-owner']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
