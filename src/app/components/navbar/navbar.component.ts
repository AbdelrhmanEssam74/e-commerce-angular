import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { NgIf } from '@angular/common';
// import { Dropdown, Collapse, initMDB } from "";

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})


export class NavbarComponent {

  constructor(private cartService: CartService,
    private router: Router
  ) {


  }

  cartCount: number = 0;


  isSigned: boolean = false;


    logout() {
    localStorage.removeItem('user');
    this.isSigned = false;
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    this.cartService.getCartCount().subscribe({
      next: (data) => {
        this.cartCount = data;
      }
    });

    const getLocalStorage = localStorage.getItem('user');

    if (getLocalStorage) {
      this.isSigned = true;
    }




  }

}
