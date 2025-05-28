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
        // Optional: Show success message
      },
      error: (err) => {
        console.error('Error removing from wishlist:', err);
        // Optional: Show error message to user
      }
    });
  }

  addToCart(item: WishlistItem): void {
    this.cartService.addToCart(item.product.id).subscribe({
      next: () => {
        // Remove from wishlist after successfully adding to cart
        this.removeFromWishlist(item.id);
        // Optional: Show success message
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
        // Optional: Show error message to user
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

  // Format price display
  formatPrice(price: string | number): string {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return numPrice.toFixed(2);
  }

  // Get product image - handles both images array and single image
  getProductImage(product: any): string {
    // إذا كان هناك مصفوفة صور، استخدم الصورة الأولى
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      return product.images[0];
    }
    // إذا كان هناك صورة واحدة
    if (product.image) {
      return product.image;
    }
    // صورة افتراضية إذا لم توجد صور
    return 'https://placehold.co/400x600?text=No+Image';
  }

  // Retry loading if there was an error
  retryLoading(): void {
    this.loadWishlistItems();
  }
}