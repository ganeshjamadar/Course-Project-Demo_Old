import { Directive, HostListener, HostBinding, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs: 'appDropdown'
})
export class DropdownDirective {
  
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { 

  }
  @HostBinding('class.show') isShow= false;
  @HostListener('click') toggleShow(){
    this.isShow = !this.isShow;
    if(this.isShow)
    {
      //this.renderer.setStyle(this.elementRef.nativeElement, 'show');
    }
    else
    {
      //this.elementRef.nativeElement.serClass('');
    }
    
  }



}
