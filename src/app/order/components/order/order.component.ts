import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs'
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

  isLinear = false;
  secondFormGroup!: FormGroup;
  state = false
  total = 0;
  products$: Observable<Product[]>;
  total$!: Observable<number>;
  displayedColumns: string[] = ['image', 'title', 'price', 'actions', 'total']


  constructor(
    private cartService: CartService,
    private _formBuilder: FormBuilder
  ) {
    this.products$ = this.cartService.cart$.pipe(map((products: Product[]) => {
      	const distintos = [...new Set(products)];
      	//console.log(distintos)
		  //console.log(distintos.length)
      	return distintos
    }))

    this.total$ = this.cartService.total$.pipe(map((total: number) => {
      return total
    }))
	//console.log(this.res = this.cartService.res)
	}

  
  ngOnInit(): void {
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    })
  }

	deleteProd(idx: string){
		console.log('eliminado del carrito')
		this.cartService.deleteFromCart(idx)	
	}

  addProd(product: Product) {
    this.cartService.addProd(product)
  }

  subtractProd(product: Product) {
    this.cartService.subtractProd(product)
  }

}
