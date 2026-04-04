import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'WAITING_FOR_BACKEND_URL'; // To be replaced

  constructor(private http: HttpClient) { }

  // Empty backend calling methods
  getProducts(): Observable<any[]> {
    // return this.http.get<any[]>(`${this.baseUrl}/products`);
    return of([]); // Empty for now
  }

  getLaptops(): Observable<any[]> {
    // return this.http.get<any[]>(`${this.baseUrl}/laptops`);
    return of([]); // Empty for now
  }

  getTelevisions(): Observable<any[]> {
    // return this.http.get<any[]>(`${this.baseUrl}/televisions`);
    return of([]); // Empty for now
  }

  postOrder(orderData: any): Observable<any> {
    // return this.http.post<any>(`${this.baseUrl}/orders`, orderData);
    return of({ success: true, dummy: true }); // Empty for now
  }
}
