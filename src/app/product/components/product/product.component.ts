//legibilidad del código cuando se tienen muchos imports - buena práctica
import {
    Component, 
    Input, 
    Output, 
    EventEmitter, 
    OnChanges, 
    SimpleChanges, 
    OnInit, 
    DoCheck, 
    OnDestroy,
    Injectable
} from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import {Product} from '../../../core/models/product.model';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {

    @Input()
    product!: Product;

    @Output()
    productClicked: EventEmitter<any> = new EventEmitter();

    constructor(
        private cartService: CartService
    ){
        // console.log('1. constructor');
    }

    /*ngOnChanges(changes: SimpleChanges){
        console.log('2. ngOnChanges');
        console.log(changes);
    }*/
    ngOnInit(){
        // console.log('3. ngOnInit');
    }

    // ngDoCheck(){
    //     console.log('4. ngDoCheck');
    // }

    // ngOnDestroy(){
    //     console.log('5. ngOnDestroy')
    // }

    addCart(){
        console.log('añadir al carrito');
        // this.product.cant += 1
        this.cartService.addCart(this.product)
        //this.productClicked.emit(this.product.id)
    }
}
