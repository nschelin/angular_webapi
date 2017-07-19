/* 
MDL setup for Angular 2+
https://denisvuyka.github.io/2016/06/06/angular2-material.html
*/
import { Directive, AfterViewChecked } from '@angular/core';

declare var componentHandler: any;

@Directive({
    selector: '[mdl]'
})
export class MDL implements AfterViewChecked {

    ngAfterViewChecked() {
        if (componentHandler) {
            componentHandler.upgradeAllRegistered();
        }
    }

}