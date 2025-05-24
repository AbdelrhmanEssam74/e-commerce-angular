import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface CartItem {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviewCount: string;
  description: string;
  price: number;
  originalPrice?: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=400&fit=crop',
      rating: 4,
      reviewCount: '2,150',
      description: 'Premium wireless headphones with noise cancellation and superior sound quality.',
      price: 199.99,
      originalPrice: 249.99,
      quantity: 1
    },
    {
      id: 2,
      name: 'Smart Watch',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=400&fit=crop',
      rating: 5,
      reviewCount: '1,890',
      description: 'Advanced fitness tracking and smart notifications on your wrist.',
      price: 299.99,
      quantity: 2
    }
  ];

  shippingCost: number = 15.00;
  taxRate: number = 0.08;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Load cart items from service if needed
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
  }

  increaseQuantity(productId: number): void {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      item.quantity++;
    }
  }

  decreaseQuantity(productId: number): void {
    const item = this.cartItems.find(item => item.id === productId);
    if (item && item.quantity > 1) {
      item.quantity--;
    }
  }

  getQuantity(productId: number): number {
    const item = this.cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }

  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getTax(): number {
    return parseFloat((this.getSubtotal() * this.taxRate).toFixed(2));
  }

  getTotal(): number {
    return parseFloat((this.getSubtotal() + this.shippingCost + this.getTax()).toFixed(2));
  }

  getTotalItems(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  checkout(): void {
    console.log('Proceeding to checkout');
    // Here you would typically navigate to checkout page
    alert('Proceeding to checkout');
  }

  continueShopping(): void {
    this.router.navigate(['/']);
  }

  goToProductDetails(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}