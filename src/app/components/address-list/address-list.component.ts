import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgForOf} from '@angular/common';
import {Address} from '../../interface/address.model';
import {AddressItemComponent} from '../address-item/address-item.component';

@Component({
  selector: 'app-address-list',
  imports: [
    NgForOf,
    AddressItemComponent
  ],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.css'
})
export class AddressListComponent {
  constructor(private http: HttpClient) {
  }

  addresses: Address[] = [];

  ngOnInit() {
    this.http.get('http://localhost:3000/api/address/1').subscribe((data: any) => {
      this.addresses = data;
      console.log(this.addresses);
    })
  }
}
