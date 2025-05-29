import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {CheckoutComponent} from './components/chekcout/checkout.component';
import {AuthGuard} from './auth.guard';
import {RegisterComponent} from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'cart' , component:CartComponent},
  {path:'wishlist' , component:WishlistComponent},
  {path: 'home', component: HomeComponent, title: 'home'},
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]
  },
  {
    path: 'register', component: RegisterComponent
  }
];
