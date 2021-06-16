import { NumberSymbol } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './../models/product.model';

@Injectable({
	providedIn: 'root'
})
export class CartService {

	private products: Product[] = [];
	private total = 0;

	private cart = new BehaviorSubject<Product[]>([]);

	cart$ = this.cart.asObservable();

	constructor() {

	}

	addCart(product: Product) {
		const id = this.products.find(prod => { return (prod.id === product.id) })

		if (this.products.length === 0) {
			this.products = [...this.products, product];
			this.cart.next(this.products);
		} else if (id === undefined) {
			this.products = [...this.products, product];
			this.cart.next(this.products);
		} else if (id !== undefined) {
			this.products.find(prod => {
				if (prod.id === product.id) {
					prod.cant += 1
				}
			})
			this.cart.next(this.products);
		}

	}

	suma(): number {
		this.total = 0
		if (this.products.length === 0) {
			return this.total = 0
		} else {
			this.products.forEach(element => {
				this.total += element.price * element.cant
			})
			return this.total
		}
	}

}
