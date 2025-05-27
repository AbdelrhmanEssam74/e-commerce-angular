import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap, of } from 'rxjs';
import { WishlistItem } from '../interface/wishlist-item';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://localhost:3000/api/wishlist';

  constructor(
    private http: HttpClient,
    private productsService: ProductsService
  ) { }

  getWishlistItems(userId: number): Observable<WishlistItem[]> {
    return this.http.get<{message: string, data: any[]}>(`${this.apiUrl}/${userId}`).pipe(
      switchMap(response => {
        const items = response.data;
        
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
            })) as WishlistItem[];
          })
        );
      })
    );
  }

  addToWishlist(productId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { 
      user_id: 1, // Hardcoded for now
      product_id: productId 
    });
  }

  removeFromWishlist(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${itemId}`);
  }

  isInWishlist(productId: number): Observable<boolean> {
    return this.getWishlistItems(1).pipe(
      map(items => items.some(item => item.product_id === productId))
    );
  }

  // Get wishlist count
  getWishlistCount(): Observable<number> {
    return this.getWishlistItems(1).pipe(
      map(items => items.length)
    );
  }
}