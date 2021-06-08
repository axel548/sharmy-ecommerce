import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  category1: string = 'Camiseta';
  category2: string = 'Sticker 1';

  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.fetchProducts()
  }

  clickProduct(id: number) {
    console.log('product:');
    console.log(id);
  }

  fetchProducts(){
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    })
  }
}
