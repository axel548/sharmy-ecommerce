import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Product} from '../../models/product.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(){
    return this.http.get<Product[]>(environment.url_api)
  }

  getProduct(id: string){
    return this.http.get<Product>(`${environment.url_api}${id}`)
  }
  
  createProduct(product: Product){
    return this.http.post(`${environment.url_api}`, product)
  }
 
  updateProduct(id: string, changes: Partial<Product>){
    return this.http.put(`${environment.url_api}${id}`, changes)
  }

  deleteProduct(id: string){
    return this.http.delete(`${environment.url_api}${id}`)
  }
}
