import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs'
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from './../../../core/models/product.model';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(
    private cartService: CartService
  ) { 
    this.products$ = this.cartService.cart$
    .pipe(map((products:Product[]) => {
      const distintos = [...new Set(products)];
      return distintos;
    }));
    
  }
  ngOnInit(): void {
  }

}
