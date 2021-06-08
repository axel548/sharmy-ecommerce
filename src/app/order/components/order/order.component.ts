import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from './../../../core/models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products: number = 0;
  secondFormGroup!: FormGroup;
  isOptional = false;
  products$: Observable<Product[]>;
  displayedColumns: string[] = ['image', 'title', 'price', 'actions']

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.products$ = this.cartService.cart$
      .pipe(map((products: Product[]) => {
        const distintos = [...new Set(products)];
        console.log(distintos)
        return distintos;
      }));
  }
  ngOnInit(): void {
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
