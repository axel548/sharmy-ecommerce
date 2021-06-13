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

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore
  ) { }

  /*getAllProducts(){
    return this.http.get<Product[]>(environment.url_api)
  }*/

  getAllProducts() {
    return this.firestore.collection('products').snapshotChanges();

  }

  // getProduct(id: string){
  //   return this.http.get<Product>(`${environment.url_api}${id}`)
  // }
  getProduct(documentId: string) {
    return  this.firestore.collection('products').doc(documentId).valueChanges()
    // .get().pipe(map(doc => {
    //   if (doc.exists) {
    //     // console.log("Document data: ", doc.data())
    //     return doc.data()
    //   } else {
    //     console.log("No such document")
    //   }
    // }))
  }

  createProduct(product: Product) {
    return this.http.post(`${environment.url_api}`, product)
  }
  // createProduct(data: Product) {
  //   return this.firestore.collection('products').add(data);
  // }

  updateProduct(id: string, changes: Partial<Product>) {
    return this.http.put(`${environment.url_api}${id}`, changes)
  }
  // updateProduct(documentId: string, data: Partial<Product>) {
  //   return this.firestore.collection('products').doc(documentId).set(data);
  // }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.url_api}${id}`)
  }
}
