import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[html5Qrcode]'
})
export class Html5QrcodeDirective {


  constructor(private element: ElementRef) {
  }

  start() {
    console.log(this.element);
  }
}
