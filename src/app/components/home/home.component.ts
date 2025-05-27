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

  constructor(private _productsService: ProductsService) {
    this._productsService.sendProducts().subscribe({
      next: (data) => {
        console.log(data);

        this.products = data.slice(0, 4);
      }
    })
  }
}
