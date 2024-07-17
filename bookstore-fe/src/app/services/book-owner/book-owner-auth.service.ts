import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AxiosService } from '../network/axios.service';

@Injectable({
  providedIn: 'root'
})
export class BookOwnerAuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private tokenKey = 'Authorization';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userRole = new BehaviorSubject<string>("");

  constructor(private http: HttpClient, private axiosService: AxiosService) { }

  signup(userDataPayload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup/`, userDataPayload);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, credentials).pipe(
      map((res) => {
        this.loggedIn.next(true)
        // this.userRole.next()
        console.log(res)
        return res;
      })
    );
  }

  logout(): Observable<any> {
    return new Observable(observer => {
      this.axiosService.post('/logout/', {}).then(response => {
        localStorage.removeItem('Authorization');
        this.loggedIn.next(false);
        observer.next(response.data);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  isLoggedIn(): Observable<boolean> {
    // return this.checkTokenValidity(token);
    const token = this.getToken();
    if (token) {
      this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getBookOwner(): Observable<any> {
    return new Observable(observer => {
      this.axiosService.get('/book-owner/1/').then(response => {
        localStorage.setItem('user_data', JSON.stringify(response?.data));
        observer.next(response.data);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  private checkTokenValidity(token: string): Promise<any> {
    return this.axiosService.get(`/token-verify/`)
  }
}
