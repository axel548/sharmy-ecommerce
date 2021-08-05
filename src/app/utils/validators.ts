import {AbstractControl} from '@angular/forms'

export class MyValidators {
    //Class for make my own validations in forms
    static isPriceValid(control: AbstractControl){
        const value = control.value;
        console.log(value);
        if (value > 10000) {
            return {price_invalid: true};
        }
        return null;
    }
}