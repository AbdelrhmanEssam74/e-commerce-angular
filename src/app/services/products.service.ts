// src/app/services/products.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/product/${id}`);
  }

  // getProduct(id: number): Observable<Product> {
  //   return this.http.get<Product>(`${this.apiUrl}/product/${id}`);
  // }

  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/search?q=${query}`);
  }

  filterProducts(params: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/filter`, { params });
  }

  sendProducts(): Observable<any> {
    return this.http.get('http://localhost:3000/api/products')
  }
}