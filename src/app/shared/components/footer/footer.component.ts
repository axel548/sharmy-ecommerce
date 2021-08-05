import { Component } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  //emailField!: FormControl;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { 
    this.matIconRegistry.addSvgIcon(
      "instagram",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/svg/ig.svg")
    );
     this.matIconRegistry.addSvgIcon(
      "facebook",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/svg/fb.svg")
    );
  
    /*this.emailField = new FormControl('', [
      Validators.required,
      Validators.email,
      //Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
    ])*/
  }

}
