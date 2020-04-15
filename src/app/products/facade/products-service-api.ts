import { Product } from './product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ProductsServiceApi {
  constructor(private http: HttpClient) { }

  private readonly JSON_URL = 'assets/data/products.json';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.JSON_URL}`);
  }
}
