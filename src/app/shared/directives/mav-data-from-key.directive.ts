import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import 'src/app/core/extensions/object.extension';

@Directive({
  selector: '[mavDataFromKey]'
})
export class MavDataFromKeyDirective implements AfterViewInit {

  @Input() data: any
  @Input() mavKey!: string;

  constructor(
    private el: ElementRef,
  ) {
  }
  ngAfterViewInit(): void {
    if (this.el && this.el.nativeElement && this.data && this.mavKey) {
      const html = `<span>${this.data.objectByKeyName(this.mavKey, this.data)}</span>`
      this.el.nativeElement.innerHTML += html;
    }
  }

  objectByString() {
    this.mavKey = this.mavKey.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    this.mavKey = this.mavKey.replace(/^\./, '');           // strip a leading dot
    var a = this.mavKey.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in this.data) {
        this.data = this.data[k];
      } else {
        return;
      }
    }
    if (!this.data) {
      return '';
    }
    return `<span>${this.data}</span>`;
  }
}
