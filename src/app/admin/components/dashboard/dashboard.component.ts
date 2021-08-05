import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/models/order.model';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from 'src/app/core/services/products/products.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  order: Order[] = [];
  product: Partial<Product>[] = [];
  totalSales: number = 0

  constructor(
    private productsService: ProductsService,
  ) {
    this.fetchOrders()
    this.fetchProducts()
    this.suma()
    console.log(this.totalSales)
  }

  ngOnInit(): void {
  }

  fetchOrders() {
    this.productsService.getAllOrders().subscribe(Snapshot => {
      Snapshot.forEach((order: any) => {
        //push information
        this.order.push({
          id: order.payload.doc.id,
          total: order.payload.doc.data()['total'],
        });
      });
    });
  }
  fetchProducts() {
    this.productsService.getAllProducts().subscribe(Snapshot => {
      Snapshot.forEach((product: any) => {
        //push information
        this.product.push({
          id: product.payload.doc.id,
        });
      });
    });
  }

  suma() {
    this.order.forEach(element => {
      this.totalSales = element.total
    })
  }
}
