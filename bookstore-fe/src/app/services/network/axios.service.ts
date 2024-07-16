import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { CustomerAuthService } from '../customer/customer-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  private axiosClient: AxiosInstance;
  private tokenKey = 'Authorization';

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://127.0.0.1:8000/api',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    this.axiosClient.interceptors.request.use(config => {
      const token = this.getToken();
      if (token) {
        config.headers['Authorization'] = `${token}`;
      }
      return config;
    });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  get(url: string, params?: any) {
    return this.axiosClient.get(url, { params });
  }

  post(url: string, data: any) {
    return this.axiosClient.post(url, data);
  }

  put(url: string, data: any) {
    return this.axiosClient.put(url, data);
  }

  delete(url: string) {
    return this.axiosClient.delete(url);
  }
}
