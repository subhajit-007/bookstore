import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_BOOK_DATA } from '../../mock-data/MOCK_BOOK_DATA'
import { MOCK_BOOK_OWNER_DATA } from '../../mock-data/MOCK_BOOK_OWNER_DATA';
import { AxiosService } from '../network/axios.service';

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

  constructor(private axiosService: AxiosService) {}

  mockData : any[] = MOCK_BOOK_DATA
  mockBookOwnerData : any[] = MOCK_BOOK_OWNER_DATA

  getBooks(): Observable<any> {
    return new Observable(observer => {
      this.axiosService.get('/book/list/').then(response => {
        observer.next(response.data);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
    // return of(this.mockData);
  }

  getBookById(bookId: string): Observable<any> {
    const book = this.mockData.find((book) => book?.id?.toString() === bookId);
    return of(book);
  }

  getBookStoreName(storeId: string): Observable<string> {
    const book_store_details = this.mockBookOwnerData.find((data) => data?.id.toString() === storeId.toString());
    return of(book_store_details?.book_store_name ?? "")
  }

  addNewBook(payload: any): Observable<any>{
    return new Observable(observer => {
      this.axiosService.post('/book/add/', payload).then(response => {
        observer.next(response.data);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }
}
