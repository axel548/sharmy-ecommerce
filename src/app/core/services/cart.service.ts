import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from './../models/product.model';

@Injectable({
	providedIn: 'root'
})
export class CartService {

	private products: Product[] = [];
 
	private cart = new BehaviorSubject<Product[]>([]);
	private total = new BehaviorSubject<number>(0);

	cart$ = this.cart.asObservable();
	total$ = this.total.asObservable();

	constructor() {

	}

	addCart(product: Product) {
		const id = this.products.find(prod => { return (prod.id === product.id) })

		if (this.products.length === 0) {
			this.products = [...this.products, product];
			this.cart.next(this.products);
			this.suma()
		} else if (id === undefined) {
			this.products = [...this.products, product];
			this.cart.next(this.products);
			this.suma()
		} else if (id !== undefined) {
			this.products.find(prod => {
				if (prod.id === product.id) {
					prod.cant += 1
				}
			})
			this.suma()
			this.cart.next(this.products);
		}

	}

	deleteFromCart(idx: string){
		this.products.forEach(function(prod, index, object){
			if (prod.id === idx){
				object.splice(index, 1)
			}				
		})		
		this.cart.next(this.products)
		console.log(this.products)
	}

	subtractProd(product:Product){
		this.products.forEach(prod => {
			if (prod.id === product.id){
				prod.cant -= 1
				if (prod.cant === 0){
					this.deleteFromCart(prod.id)
				}
			}
		})
	}

	addProd(product:Product){
		this.products.forEach(prod => {
			if (prod.id === product.id){
				prod.cant += 1   
			}
		})
	}

	suma() {
		let total!: number
		if (this.products.length === 0) {
			total = 0
			this.total.next(total)
		} else {
			this.products.forEach(element => {
				total += element.price * element.cant
				this.total.next(total);
			})
		}
	}
}
