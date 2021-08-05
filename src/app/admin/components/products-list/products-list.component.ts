import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LogoutDialogComponent } from 'src/app/shared/components/logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  //Products
  product: Product[] = [];
  //Table's column
  displayedColumns: string[] = ['image', 'title', 'price', 'category', 'sizes', 'actions'];
  //Table's data
  dataSource = this.product;
  //Duration of SnackBar
  durationInSeconds = 5;

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.fetchProducts()
  }

  ngOnInit(): void {
  }

  //Set of the products
  fetchProducts() {
    this.productsService.getAllProducts().subscribe(prodSnapshot => {
      prodSnapshot.forEach((producto: any) => {
        //push information
        this.product.push({
          id: producto.payload.doc.id,
          image: producto.payload.doc.data()['image'],
          title: producto.payload.doc.data()['title'],
          price: producto.payload.doc.data()['price'],
          category: producto.payload.doc.data()['category'],
          description: producto.payload.doc.data()['description'],
          cant: producto.payload.doc.data()['cant'],
          sizes: producto.payload.doc.data()['sizes']
        });
      });
    });
  }

  //Delete product
  deleteProduct(id: string) {
    this.productsService.deleteProduct(id)
  }

  //Open the Dialog
  openDialog(id: string): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '350px',
      data: { message: '¿Desea Eliminar el producto?', btn: 'Eliminar Producto' }
    })
    dialogRef.afterClosed().subscribe(res => {
      //res = true
      if (res) {
        this.openSnackBar("Producto Eliminado", "Deshacer", id)
      }
    })
  }

  //Open the SnackBar
  openSnackBar(message: string, action: string, id: string) {
    let snackRef = this._snackBar.open(message, action, {
      duration: 3000
    });
    snackRef.afterDismissed().subscribe(() => {
      console.log("The product was delete")
      this.deleteProduct(id)
    })
    snackRef.onAction().subscribe(() => {
      console.log("The snackbar action was triggered")
    })
  }

}
