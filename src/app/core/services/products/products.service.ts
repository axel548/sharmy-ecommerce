import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../../models/product.model';

import { environment } from 'src/environments/environment';

import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  COLLECTION_PRODUCTS = 'products'
  COLLECTION_ORDERS = 'pedido'

  constructor(
    private firestore: AngularFirestore
  ) { }

  getAllOrders() {
    return this.firestore.collection(this.COLLECTION_ORDERS).snapshotChanges();
  }

  getAllProducts() {
    return this.firestore.collection(this.COLLECTION_PRODUCTS).snapshotChanges();
  }

  getProduct(documentId: string) {
    return  this.firestore.collection(this.COLLECTION_PRODUCTS).doc(documentId).valueChanges()
  }

  createProduct(data: Product) {
    return this.firestore.collection(this.COLLECTION_PRODUCTS).add(data);
  }

  updateProduct(documentId: string, data: Partial<Product>) {
    return this.firestore.collection(this.COLLECTION_PRODUCTS).doc(documentId).set(data);
  }

  deleteProduct(documentId: string) {
    return this.firestore.collection(this.COLLECTION_PRODUCTS).doc(documentId).delete();
  }
}
