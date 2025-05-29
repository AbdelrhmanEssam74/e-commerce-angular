import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderComponent } from '../header/header.component';
import { Products } from '../../interface/products';
import { ProductsService } from '../../services/products.service';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ourProducts } from '../../interface/ourProducts';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interface/cart-item';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, NavbarComponent, HeaderComponent, CurrencyPipe, NgStyle, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  faHeart = faHeart;
  faHome = faHome;
  faCartShopping = faCartShopping;

  products: ourProducts[] = [];
  cartItem: CartItem[] = [];
  // constructor(private _productsService: ProductsService) {
  //   this._productsService.sendProducts().subscribe({
  //     next: (data) => {
  //       this.products = data.slice(0, 4);
  //     }
  //   })
  // }


  constructor(private cartService: CartService) {
    this.cartService.sendProducts().subscribe({
      next: (data) => {
        this.products = data.slice(0, 4);
      }
    })
  }


  // addToCartFromHome(productId: number) {
  //   this.cartService.addToCart(productId).subscribe({
  //       next: (response) => {
  //         console.log('Product added to cart successfully:', response);
  //         alert('Product added to cart successfully!');
  //       },
  //       error: (err) => {
  //         console.error('Error adding product to cart:', err);
  //         alert('Failed to add product to cart. Please try again.');
  //  }
  // });
  // }


    addToCart(productId: number): void {
      this.cartService.addToCart(productId).subscribe({
        next: (response) => {
          console.log('Product added to cart successfully:', response);
          alert('Product added to cart successfully!');
        },
        error: (err) => {
          console.error('Error adding product to cart:', err);
          alert('Failed to add product to cart. Please try again.');
   }
  });
  }
}
