import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddressService } from '../../services/address.service'; // adjust path

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css',
})
export class AddressFormComponent implements OnInit {
  addressForm!: FormGroup;
  submitted = false;
  user: any;

  constructor(private fb: FormBuilder, private addressService: AddressService) {}

  ngOnInit() {
    this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

    this.addressForm = this.fb.group({
      full_name: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      postal_code: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
    });
  }

  get f() {
    return this.addressForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.addressForm.invalid) {
      return;
    }

    const addressData = {
      userId: this.user?.id,
      ...this.addressForm.value,
    };

    this.addressService.addAddress(addressData, this.user?.id);
    this.addressForm.reset();
    this.submitted = false;
  }
}
