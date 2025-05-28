import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../../interface/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  isLoading = true;
  shippingCost = 5.99;
  error: string | null = null;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.isLoading = true;
    this.error = null;
    
    this.cartService.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading cart:', err);
        this.error = 'Failed to load cart items. Please try again.';
        this.isLoading = false;
      }
    });
  }

  removeFromCart(itemId: number): void {
    this.cartService.removeFromCart(itemId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
        // Optional: Show success message
      },
      error: (err) => {
        console.error('Error removing from cart:', err);
        // Optional: Show error message to user
      }
    });
  }

  increaseQuantity(item: CartItem): void {
    const newQuantity = item.quantity + 1;
    this.updateQuantity(item, newQuantity);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      this.updateQuantity(item, newQuantity);
    }
  }

  private updateQuantity(item: CartItem, newQuantity: number): void {
    this.cartService.updateCartItem(item.id, newQuantity).subscribe({
      next: () => {
        item.quantity = newQuantity;
      },
      error: (err) => {
        console.error('Error updating quantity:', err);
        // Optional: Show error message to user
      }
    });
  }

  getSubtotal(): number {
    const subtotal = this.cartItems.reduce((sum, item) => 
      sum + (parseFloat(item.product.price) * item.quantity), 0);
    return Math.round(subtotal * 100) / 100;
  }

  getTax(): number {
    const tax = this.getSubtotal() * 0.1; // 10% tax
    return Math.round(tax * 100) / 100;
  }

  getTotal(): number {
    const total = this.getSubtotal() + this.shippingCost + this.getTax();
    return Math.round(total * 100) / 100;
  }

  getTotalItems(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      return;
    }
    this.router.navigate(['/checkout']);
  }

  continueShopping(): void {
    this.router.navigate(['/home']);
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

  // Get product image - handles both images array and single image - FIXED
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
    this.loadCartItems();
  }
}