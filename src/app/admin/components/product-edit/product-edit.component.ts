import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { MyValidators } from 'src/app/utils/validators';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

export interface Sizes {
  name: string;
}

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form!: FormGroup;
  id!: string;
  product!: any;
  image$!: Observable<any>;
  categoryControl = new FormControl('');

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  sizes: Sizes[] = [
    { name: 'XL' },
    { name: 'L' },
    { name: 'M' },
    { name: 'S' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private storage: AngularFireStorage
  ) {
    this.buildForm()
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.fetchProduct(this.id)

    });
  }

  fetchProduct(id: string) {
    this.productsService.getProduct(id).subscribe(producto => {
      this.product = producto
      this.product.id = id
      console.log(this.product)
      this.form.patchValue(this.product)
    })
  }

  saveProduct(event: Event) {
    event.preventDefault()
    // if (this.form.valid) {
    //   const product = this.form.value;
    //   this.productsService.updateProduct(this.id, product)
    //     .subscribe((newProduct) => {
    //       console.log(newProduct);
    //       this.router.navigate(['./admin/products']);
    //     });
    // }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description: ['', [Validators.required]],
      category: ['', Validators.required],
      cant: ['', Validators.required],
      sizes: ['', Validators.required],
    });
  }

  get priceField() {
    return this.form.get('price')
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.sizes.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(size: Sizes): void {
    const index = this.sizes.indexOf(size);

    if (index >= 0) {
      this.sizes.splice(index, 1);
    }
  }
  // openBottomSheet(): void {
  //   this._bottomSheet.open(BottomSheetComponent);
  // }

  uploadFile(event: any) {
    const file = event.target.files[0]
    const name = 'image.png';
    const fileRef = this.storage.ref(name);
    const task = this.storage.upload(name, file)

    task.snapshotChanges()
      .pipe(
        finalize(() => {
          this.image$ = fileRef.getDownloadURL()
          this.image$.subscribe(url => {
            this.form.get('image')?.setValue(url)
          })
        })
      )
      .subscribe()
  }


}
