import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';

@Pipe({
  name: 'cartRepeat'
})
export class CartPipe implements PipeTransform {

  product!: Product[];

  constructor(
    private cartService: CartService
  ) {
  }

  transform(product: any, args?: any): any {
    //That pipe is for delete repetitive products
    var total = 0;
    this.cartService.cart$.subscribe(products => {
      products.forEach((elemento) => {
        if (elemento.id === product.id) {
          total += 1;
          // elemento.cant += 1;
        }
      });
    });
    return total;
  }

}




