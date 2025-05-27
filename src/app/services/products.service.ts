import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpCLient: HttpClient) { }

  sendProducts(): Observable<any> {
    return this._HttpCLient.get('http://localhost:3000/api/products')
  }
}
