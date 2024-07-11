import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_BOOK_DATA } from '../../mock-data/MOCK_BOOK_DATA'
import { MOCK_BOOK_OWNER_DATA } from '../../mock-data/MOCK_BOOK_OWNER_DATA';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  /**
   * This service features are below
   * 1. Fetch book list
   * 2. Fecth perticular book based on book-id
   * 3.
   */

  constructor() {}

  mockData : any[] = MOCK_BOOK_DATA
  mockBookOwnerData : any[] = MOCK_BOOK_OWNER_DATA

  // mockData: any[] = [
  //   {
  //     id: "1",
  //     title: 'Book 1',
  //     author: 'Author 1',
  //     thumbnail: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //     price: '1000',
  //     rating: '4',
  //   },
  //   {
  //     id: "2",
  //     title: 'Book 2',
  //     author: 'Author 2',
  //     thumbnail: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //     price: '1000',
  //     rating: '4',
  //   },
  //   {
  //     id: "3",
  //     title: 'Book 3',
  //     author: 'Author 3',
  //     thumbnail: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //     price: '1000',
  //     rating: '4',
  //   },
  //   {
  //     id: "4",
  //     title: 'Book 4',
  //     author: 'Author 3',
  //     thumbnail: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //     price: '1000',
  //     rating: '4',
  //   },
  //   {
  //     id: "5",
  //     title: 'Book 5',
  //     author: 'Author 3',
  //     thumbnail: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //     price: '1000',
  //     rating: '4',
  //   },
  //   {
  //     id: "6",
  //     title: 'Book 6',
  //     author: 'Author 3',
  //     thumbnail: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //     price: '1000',
  //     rating: '4',
  //   },
  // ];

  getBooks(): Observable<any[]> {
    return of(this.mockData);
  }

  getBookById(bookId: string): Observable<any> {
    const book = this.mockData.find((book) => book?.id?.toString() === bookId);
    return of(book);
  }

  getBookStoreName(storeId: string): Observable<string> {
    const book_store_details = this.mockBookOwnerData.find((data) => data?.id.toString() === storeId.toString());
    return of(book_store_details?.book_store_name ?? "")
  }
}
