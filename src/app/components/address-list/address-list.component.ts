import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { AddressService } from '../../services/address.service';
import { Address } from '../../interface/address.model';
import {AddressItemComponent} from '../address-item/address-item.component';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.css',
  imports: [
    AddressItemComponent
  ]
})
export class AddressListComponent implements OnInit {
  user: any = null;
  addresses: Address[] = [];

  @Output() addressSelected = new EventEmitter<number>();

  selectAddress(id: number) {
    this.addressSelected.emit(id);
  }

  constructor(private addressService: AddressService) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);

      if (this.user.id) {

        this.addressService.addresses$.subscribe(addresses => {
          this.addresses = addresses;
        });


        this.addressService.loadAddresses(this.user.id);

      }
    }
  }
}
