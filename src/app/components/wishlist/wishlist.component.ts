import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { Product } from '../../interface/product';
import { WishlistItem } from '../../interface/wishlist-item';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlistItems: WishlistItem[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadWishlistItems();
  }

  loadWishlistItems(): void {
    this.isLoading = true;
    this.error = null;
    
    this.wishlistService.getWishlistItems(1).subscribe({
      next: (items) => {
        this.wishlistItems = items;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading wishlist:', err);
        this.error = 'Failed to load wishlist items. Please try again.';
        this.isLoading = false;
      }
    });
  }

  removeFromWishlist(itemId: number): void {
    this.wishlistService.removeFromWishlist(itemId).subscribe({
      next: () => {
        this.wishlistItems = this.wishlistItems.filter(item => item.id !== itemId);
      },
      error: (err) => {
        console.error('Error removing from wishlist:', err);
      }
    });
  }

  addToCart(item: WishlistItem): void {
    this.cartService.addToCart(item.product.id).subscribe({
      next: () => {
        this.removeFromWishlist(item.id);
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
      }
    });
  }

  goToProductDetails(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  getStars(rating: string): number[] {
    const numericRating = parseFloat(rating) || 0;
    return Array(Math.floor(numericRating)).fill(0);
  }

  getEmptyStars(rating: string): number[] {
    const numericRating = parseFloat(rating) || 0;
    return Array(5 - Math.floor(numericRating)).fill(0);
  }

  formatPrice(price: string | number): string {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return numPrice.toFixed(2);
  }

  getProductImage(product: any): string {
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      return product.images[0];
    }
    if (product.image) {
      return product.image;
    }
    return 'https://placehold.co/400x600?text=No+Image';
  }

  retryLoading(): void {
    this.loadWishlistItems();
  }
}