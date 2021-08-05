import { Component, OnInit } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {

  image$!: Observable<any>;
  form!: FormGroup;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    private storage: AngularFireStorage) 
    { }

  ngOnInit(): void {
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

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
