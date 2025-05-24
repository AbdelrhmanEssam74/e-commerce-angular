import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviewCount: string;
  description: string;
  price: number;
  originalPrice?: number;
}

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  
  wishlistItems: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=400&fit=crop',
      rating: 4,
      reviewCount: '2,150',
      description: 'Premium wireless headphones with noise cancellation and superior sound quality.',
      price: 199.99,
      originalPrice: 249.99
    },
    {
      id: 2,
      name: 'Smart Watch',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=400&fit=crop',
      rating: 5,
      reviewCount: '1,890',
      description: 'Advanced fitness tracking and smart notifications on your wrist.',
      price: 299.99
    },
    {
      id: 3,
      name: 'Laptop Backpack',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop',
      rating: 4,
      reviewCount: '856',
      description: 'Durable and stylish backpack perfect for work and travel.',
      price: 79.99,
      originalPrice: 99.99
    },
    {
      id: 4,
      name: 'Bluetooth Speaker',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=400&fit=crop',
      rating: 4,
      reviewCount: '1,245',
      description: 'Portable speaker with crystal clear sound and long battery life.',
      price: 89.99
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Load data from service if needed
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  addToCart(product: Product): void {
    console.log('Adding to cart:', product);
    // Here you would typically call a cart service
    alert(`${product.name} has been added to your cart`);
  }

  removeFromWishlist(productId: number): void {
    this.wishlistItems = this.wishlistItems.filter(item => item.id !== productId);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  goToProductDetails(productId: number): void {
    this.router.navigate(['/product', productId]);
  }
}