import { Component } from '@angular/core';
import {AddressListComponent} from '../address-list/address-list.component';

@Component({
  selector: 'app-chekcout',
  imports: [
    AddressListComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

}
