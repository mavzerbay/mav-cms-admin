import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { ActivityPipe } from '../pipes/activity.pipe';
import { YesNoPipe } from '../pipes/yes-no.pipe';
import { LocalizationService } from '../services/localization.service';

@Directive({
  selector: '[mavDataFromKey]'
})
export class MavDataFromKeyDirective implements AfterViewInit {

  @Input() data: any
  @Input() mavKey!: string;
  @Input() pipeName: string | undefined;

  constructor(
    private el: ElementRef,
    private localizationService: LocalizationService
  ) {
  }
  ngAfterViewInit(): void {
    if (this.el && this.el.nativeElement && this.data && this.mavKey) {
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
      if (this.data != null && k in this.data) {
        this.data = this.data[k];
      } else {
        return '';
      }
    }
    if (this.data == null || this.data == undefined || this.data == NaN) {
      return '';
    }
    if (this.pipeName != undefined) {
      let classType = 'danger';
      switch (this.pipeName) {
        case 'yesNo':
          classType = this.data == true ? 'success' : 'danger';
          return `<span class="badge badge-pill badge-${classType}">${new YesNoPipe(this.localizationService).transform(this.data)}</span>`;
        case 'activity':
          classType = this.data == true ? 'success' : 'danger';
          return `<span class="badge badge-pill badge-${classType}">${new ActivityPipe(this.localizationService).transform(this.data)}</span>`;
        default:
          return `<span>${this.data}</span>`;
      }
    } else
      return `<span>${this.data}</span>`;
  }

  filterByUserLanguage(data: any[]): number {
    return data.findIndex(x => x.languageId == this.localizationService.getPrimaryLanguage?.id);
  }
}
