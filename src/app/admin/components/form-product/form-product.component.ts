import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProductsService } from 'src/app/core/services/products/products.service';
import {MyValidators} from './../../../utils/validators'
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';


export interface Sizes {
  name: string;
}

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form!: FormGroup;
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
    private router:Router,
    private storage: AngularFireStorage
  ) { 
    this.buildForm()
  }

  ngOnInit(): void {
    
  }

  saveProduct(event: Event){
    event.preventDefault()
    if (this.form.valid){
      const data = this.form.value;
      this.productsService.createProduct(data).then((newproduct) => {
        console.log('Documento creado exitósamente!');
        console.log(newproduct);
        // this.router.navigate(['./admin/products']);
        this.form.setValue({
          title: '',
          price: '',
          image: '',
          description: '',
        });
      }, (error) => {
        console.log(error)
      })
    }

    

  }

  private buildForm(){
    this.form = this.formBuilder.group({
      // id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description: ['', [Validators.required]],
      // sizes: ['', [Validators.required]],
      // category: ['', [Validators.required]]
    });
  }

  get priceField(){
    return this.form.get('price')
  }

  uploadFile(event: any) {
      const file = event.target.files[0]
      const name = event.target.files[0].name
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

}
