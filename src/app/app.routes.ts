import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

export const routes: Routes = [
  {path:'' , component:HomeComponent},
  {path:'home', component: HomeComponent, title: 'Home' },
  {path:'cart' , component:CartComponent, title: 'CartItem'},
  {path:'wishlist' , component:WishlistComponent, title: 'WishList'},

];
