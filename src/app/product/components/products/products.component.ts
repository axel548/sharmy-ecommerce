import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[]= [];
  category1: string = 'vestido';
  category2: string = 'bikini';
  category3: string = 'falda';
  category4: string = 'kimono';
  category5: string = 'salidabaño';

  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.fetchProducts()
    console.log(this.products)
  }

  clickProduct(id: number) {
    console.log('product:');
    console.log(id);
  }

  fetchProducts() {
    /* this.productService.getAllProducts().subscribe(products => {
       this.cats = products;
     })*/
    this.productService.getAllProducts().subscribe(prodSnapshot => {
      prodSnapshot.forEach((producto: any) => {
        this.products.push({
          id: producto.payload.doc.id,
          image: producto.payload.doc.data()['image'],
          title: producto.payload.doc.data()['title'],
          price: producto.payload.doc.data()['price'],
          category: producto.payload.doc.data()['category'],
          description: producto.payload.doc.data()['description'],
          cant: producto.payload.doc.data()['cant']
        });
      });
    });
  }
}
