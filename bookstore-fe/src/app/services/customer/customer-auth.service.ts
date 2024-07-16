import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import axios, { AxiosInstance } from 'axios';
import { AxiosService } from '../network/axios.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerAuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private tokenKey = 'Authorization';

  constructor(private http: HttpClient, private axiosService: AxiosService) {}

  signup(userDataPayload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup/`, userDataPayload);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, credentials);
  }

  logout(): Observable<any> {
    // return this.axiosService.post(`/logout/`, {});
    return new Observable(observer => {
      this.axiosService.post('/logout/', {}).then(response => {
        localStorage.removeItem('Authorization');
        observer.next(response.data);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  isLoggedIn(): Observable<boolean> {
    const token = this.getToken();
    if (!token) {
      return of(false);
    }
    return of(true);
    // return this.checkTokenValidity(token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private checkTokenValidity(token: string): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization: `Token ${token}`,
    });
    return this.http.get(`${this.apiUrl}/token-verify/`, { headers }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
