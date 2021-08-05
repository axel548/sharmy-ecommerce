import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ExponentialPipe } from './pipes/exponential/exponential.pipe';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
//import { CartComponent } from './components/cart/cart.component';

import { MaterialModule } from './../material/material.module';
import { CartPipe } from './pipes/cart/cart.pipe';
import { LogoutDialogComponent } from './components/logout-dialog/logout-dialog.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';

@NgModule({
  declarations: [
    ExponentialPipe,
    HighlightDirective,
    HeaderComponent,
    FooterComponent,
    CartPipe,
    LogoutDialogComponent,
    SnackBarComponent,
    BottomSheetComponent,
    //CartComponent
  ],
  exports: [
    ExponentialPipe,
    HighlightDirective,
    HeaderComponent,
    FooterComponent,
    CartPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
