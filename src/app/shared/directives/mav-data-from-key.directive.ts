import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import 'src/app/core/extensions/object.extension';
import { LocalizationService } from '../services/localization.service';

@Directive({
  selector: '[mavDataFromKey]'
})
export class MavDataFromKeyDirective implements AfterViewInit {

  @Input() data: any
  @Input() mavKey!: string;

  constructor(
    private el: ElementRef,
    private localizationService: LocalizationService
  ) {
  }
  ngAfterViewInit(): void {
    if (this.el && this.el.nativeElement && this.data && this.mavKey) {
      //const html = `<span>${this.data.objectByKeyName(this.mavKey, this.data)}</span>`
      this.el.nativeElement.innerHTML += this.objectByString();
    }
  }

  objectByString() {
    this.mavKey = this.mavKey.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    this.mavKey = this.mavKey.replace(/^\./, '');           // strip a leading dot
    var a = this.mavKey.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k == "0" && a[i - 1].includes('Trans')) {
        k = this.filterByUserLanguage(this.data).toString();
      }
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

  filterByUserLanguage(data: any[]): number {
    return data.findIndex(x => x.languageId == this.localizationService.getPrimaryLanguage?.id);
  }
}
