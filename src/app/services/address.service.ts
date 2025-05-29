import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Address } from '../interface/address.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private addressesSubject = new BehaviorSubject<Address[]>([]);
  public addresses$ = this.addressesSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadAddresses(userId: number) {
    this.http.get<Address[]>(`http://localhost:3000/api/address/${userId}`)
      .subscribe({
        next: (addresses) => this.addressesSubject.next(addresses),
        error: (err) => console.error('Error loading addresses:', err),
      });
  }

  addAddress(address: Address, userId: number) {
    return this.http.post<Address>(`http://localhost:3000/api/address`, address)
      .subscribe({
        next: (newAddress) => {
          const current = this.addressesSubject.value;
          this.addressesSubject.next([...current, newAddress]);
        },
        error: (err) => console.error('Error adding address:', err),
      });
  }
}
