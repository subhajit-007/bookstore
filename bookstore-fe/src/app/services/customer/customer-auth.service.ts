import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerAuthService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  signUp(username: string, password: string, email: string, first_name: string, last_name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup/`, { username, password, email, first_name, last_name });
  }

  login(payload: {username: any, password: any}): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, payload);
  }

  refreshToken(refresh: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/token/refresh/`, { refresh });
  }
}
