import {AfterContentChecked, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: "textarea[autoresize]" // Attribute selector
})
export class AutoresizeDirective implements AfterContentChecked {

  @Input('autoresize') maxHeight: number;

  constructor(public element: ElementRef) {
  }

  ngAfterContentChecked() {
    this.adjust();
  }

  adjust(): void {
    let ta = this.element.nativeElement;
    let newHeight;

    if (ta) {
      ta.style.overflow = "hidden";
      ta.style.height = "auto";
      if (this.maxHeight) {
        console.log('this.maxHeight',this.maxHeight)
        newHeight = Math.min(ta.scrollHeight, this.maxHeight);
        console.log('newHeight',newHeight)
      } else {
        newHeight = ta.scrollHeight;
      }
      ta.style.height = newHeight + "px";
    }
  }
}
