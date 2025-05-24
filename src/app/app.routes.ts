import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

export const routes: Routes = [
  {path:'' , component:HomeComponent},
  {path:'\cart' , component:CartComponent},
  {path:'\wishlist' , component:WishlistComponent},
  
];
