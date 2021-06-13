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

	suma() {
		if (this.products.length === 0) {
			return this.total = 0
		} else {
			for (let i = 0; i <= this.products.length; i++) {
				this.total += (this.products[i].cant * this.products[i].price)
			}
			return this.total
		}
	}

	// distintos() {
	// 	const resultado = Array.from(new Set(this.products.map(s => s.id)))
	// 		.map(id => {
	// 			return {
	// 				id: id,
	// 				title: this.products.find(s => s.id === id)?.title,
	// 				image: this.products.find(s => s.id === id)?.image,
	// 				price: this.products.find(s => s.id === id)?.price,
	// 				category: this.products.find(s => s.id === id)?.category,
	// 				description: this.products.find(s => s.id === id)?.description,
	// 				cant: this.products.find(s => s.id === id)?.cant,
	// 			};
	// 		});
	// 	console.log(resultado)
	// }
}
