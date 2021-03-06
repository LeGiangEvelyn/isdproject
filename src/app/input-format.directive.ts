import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appInputFormat]'
})
export class InputFormatDirective {
  @Input('appInputFormat') type: String;
  @HostListener('blur', ['$event'])
  onBlur() {
    if (this.type === 'uppercase') {
    this.el.nativeElement.value = this.el.nativeElement.value.toUpperCase();
    } else {
    this.el.nativeElement.value = this.el.nativeElement.value.toLowerCase();
    }
  console.log(this.el);
      
  }
  constructor(private el: ElementRef) { 

  }
}
