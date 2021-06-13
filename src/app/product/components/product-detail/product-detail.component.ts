import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ProductsService } from './../../../core/services/products/products.service';
import { Product } from '../../../core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';
import { Observable, PartialObserver } from 'rxjs';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product!: any;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.fetchProduct(id)
    });
    
    console.log(this.product)
  }

  fetchProduct(id: string) {
    this.productsService.getProduct(id).subscribe(producto => {
      this.product = producto
      this.product.id = id
    })
  }

  addCart() {
    console.log('añadir al carrito');
    this.cartService.addCart(this.product)
    //this.productClicked.emit(this.product.id)
  }

  // createProduct() {
  //   const newProduct: any = {
  //     id: '1562',
  //     title: 'nuevo desde angular',
  //     image: 'assets/images/banner-1.jpg',
  //     price: 3000,
  //     description: 'nuevo producto'
  //   }
  //   this.productsService.createProduct(newProduct).subscribe(product => {
  //     console.log(product)
  //   })
  // }

  // updateProduct() {
  //   const updateProduct: Partial<Product> = {
  //     price: 5555,
  //     description: 'edición titulo'
  //   }
  //   this.productsService.updateProduct('2', updateProduct).subscribe(product => {
  //     console.log(product)
  //   })
  // }

  // deleteProduct() {
  //   this.productsService.deleteProduct('1562').subscribe(rta => {
  //     console.log(rta)
  //   })
  // }


}
