import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-address-item',
  imports: [],
  templateUrl: './address-item.component.html',
  styleUrl: './address-item.component.css'
})
export class AddressItemComponent {
  @Input() address: any;
  }
