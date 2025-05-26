import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap, of } from 'rxjs';
import { CartItem } from '../interface/cart-item';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/api/cart';
  private userId = 1; // Hardcoded for now

  constructor(
    private http: HttpClient,
    private productsService: ProductsService
  ) { }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${this.userId}`).pipe(
      switchMap(items => {
        // Handle empty cart case
        if (!items || items.length === 0) {
          return of([]);
        }

        const productObservables = items.map(item => 
          this.productsService.getProductById(item.product_id)
        );
        
        return forkJoin(productObservables).pipe(
          map(products => {
            return items.map((item, index) => ({
              ...item,
              product: products[index]
            })) as CartItem[];
          })
        );
      })
    );
  }

  addToCart(productId: number, quantity: number = 1): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, {
      user_id: this.userId,
      product_id: productId,
      quantity: quantity
    });
  }

  removeFromCart(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${itemId}`);
  }

  updateCartItem(itemId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${itemId}`, {
      quantity: quantity
    });
  }

  // Helper method to get cart count
  getCartCount(): Observable<number> {
    return this.getCartItems().pipe(
      map(items => items.reduce((sum, item) => sum + item.quantity, 0))
    );
  }
}