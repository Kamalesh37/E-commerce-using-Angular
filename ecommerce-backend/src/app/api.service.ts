import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://127.0.0.1:8000/api'; // Pointed to Laravel Backend
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) { }

  // Authentication Methods
  register(userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Accept': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/register`, userData, { headers });
  }

  login(credentials: any): Observable<any> {
    const headers = new HttpHeaders({ 'Accept': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/login`, credentials, { headers });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  }

  // Product Methods (Public - No Token Required)
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products`);
  }

  getProductById(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/${id}`);
  }

  getLaptops(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/laptops`);
  }

  getMobiles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/mobiles`);
  }

  getTelevisions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/televisions`);
  }

  // Auth-Controlled Routes (Protected - Token Required)
  postOrder(orderData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/orders`, orderData, { headers: this.getAuthHeaders() });
  }

  getUserOrders(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/user/orders`, { headers });
  }

  // Cart Methods (Protected)
  getCart(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/cart`, { headers: this.getAuthHeaders() });
  }

  syncCart(items: any[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/cart/sync`, { items }, { headers: this.getAuthHeaders() });
  }

  addCartItem(item: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/cart`, item, { headers: this.getAuthHeaders() });
  }

  updateCartItem(id: number | string, diff: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/user/cart/${id}`, { diff }, { headers: this.getAuthHeaders() });
  }

  removeCartItem(id: number | string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/user/cart/${id}`, { headers: this.getAuthHeaders() });
  }

  clearCart(): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/user/cart/clear`, { headers: this.getAuthHeaders() });
  }
}
