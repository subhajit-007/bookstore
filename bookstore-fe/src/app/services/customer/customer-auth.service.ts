import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import axios, { AxiosInstance } from 'axios';
import { AxiosService } from '../network/axios.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerAuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private tokenKey = 'Authorization';
  private loggedIn = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient, private axiosService: AxiosService) {}

  signup(userDataPayload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup/`, userDataPayload);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, credentials).pipe(
      map((res) => {
        this.loggedIn.next(true)
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

  private checkTokenValidity(token: string): Promise<any> {
    return this.axiosService.get(`/token-verify/`)
  }
}
