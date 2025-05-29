import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DecimalPipe} from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AddressFormComponent} from '../address-form/address-form.component';

interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

interface FullCartItem {
  cartId: number;
  product?: Product;
  quantity: number;
}

interface Address {
  id: number;
  street: string;
  city: string;
  postal_code: string;
  shipping_times: number;
}

interface ShippingOption {
  id: string;
  name: string;
  cost: number;
  estimated_delivery_days?: number;
}



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  imports: [
    DecimalPipe,
    AddressFormComponent
  ],
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  fullCart: FullCartItem[] = [];
  addresses: Address[] = [];
  shippingOptions: ShippingOption[] = [];

  selectedAddressId: number | null = null;
  selectedShippingId: string = '';
  selectedPaymentMethod: string = 'bank';

  newAddressForm: FormGroup;
  loading = true;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.newAddressForm = this.fb.group({
      fullName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postal_code: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-]{7,15}$/)]]
    });
  }

  private loadShippingOptions() {
    this.http.get<ShippingOption[]>('http://localhost:3000/api/shipping').subscribe({
      next: (data) => {
        this.shippingOptions = data.map(opt => ({
          ...opt,
          cost: Number(opt.cost)  // ensure cost is number
        }));
        this.selectedShippingId = this.shippingOptions.length > 0 ? this.shippingOptions[0].id : '';
      },
      error: (err) => console.error('Failed to load shipping options', err)
    });
  }


  ngOnInit() {
    this.loadCartAndProducts();
    this.loadAddresses();
    this.loadShippingOptions();
  }


  get userId(): number {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : null;
  }

  private loadCartAndProducts() {
    this.http.get<CartItem[]>(`http://localhost:3000/api/cart/${this.userId}`).subscribe({
      next: (cart) => {

        const productRequests = cart.map(item =>
          this.http.get<Product>(`http://localhost:3000/api/product/${item.product_id}`).pipe(

            catchError(() => of(undefined))
          )
        );

        forkJoin(productRequests).subscribe(products => {
          this.fullCart = cart.map((item, index) => ({
            cartId: item.id,
            product: products[index],
            quantity: item.quantity
          }));
          this.loading = false;
        });
      },
      error: (err) => {
        console.error('Failed to load cart', err);
        this.loading = false;
      }
    });
  }


  private loadAddresses() {
    this.http.get<Address[]>(`http://localhost:3000/api/address/${this.userId}`).subscribe({
      next: (data) => {
        this.addresses = data;
        const defaultAddr = this.addresses.find(addr => addr.shipping_times >= 3);
        this.selectedAddressId = defaultAddr ? defaultAddr.id : (this.addresses[0]?.id || null);
      },
      error: (err) => console.error('Failed to load addresses', err)
    });
  }

  get subtotal(): number {
    return this.fullCart.reduce((sum, item) => {
      return item.product ? sum + item.product.price * item.quantity : sum;
    }, 0);
  }

  get shippingCost(): number {
    const cost = this.shippingOptions.find(opt => opt.id === this.selectedShippingId)?.cost;
    return typeof cost === 'number' ? cost : 0;
  }


  get total(): number {
    return this.subtotal + this.shippingCost;
  }

  onShippingChange(optionId: string) {
    this.selectedShippingId = optionId;
  }

  onAddressChange(addressId: number) {
    this.selectedAddressId = addressId;
  }

  onPaymentMethodChange(method: string) {
    this.selectedPaymentMethod = method;
  }

  placeOrder() {
    if (!this.selectedAddressId || !this.selectedShippingId || !this.selectedPaymentMethod) {
      alert('Please fill in all required selections.');
      return;
    }

    // Prepare cartItems array from fullCart
    const cartItems = this.fullCart
      .filter(item => item.product)
      .map(item => ({
        productId: item.product!.id,
        quantity: item.quantity
      }));

    const orderPayload = {
      userId: this.userId,
      cartItems,
      addressId: this.selectedAddressId,
      shippingOptionId: this.selectedShippingId,
      paymentMethod: this.selectedPaymentMethod
    };

    this.http.post(`http://localhost:3000/api/checkout`, orderPayload).subscribe({
      next: () => {
        alert('Order placed successfully!');
      },
      error: (err) => {
        console.error('Order placement failed', err);
        alert('Order failed. Please try again.');
      }
    });
  }

}
