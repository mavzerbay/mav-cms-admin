import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTopbarItem]'
})
export class TopbarItemDirective {

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
  ) { }

  @HostListener('click') onClick() {
    const allTopbarItems = document.querySelectorAll('li[apptopbaritem]');
    allTopbarItems.forEach(element => {
      if (element.classList.contains('active-topmenuitem'))
        element.classList.remove('active-topmenuitem');
    });

    this.elRef.nativeElement.classList.add('active-topmenuitem');
  }
}
