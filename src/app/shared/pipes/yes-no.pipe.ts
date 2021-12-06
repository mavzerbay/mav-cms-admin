import { Pipe, PipeTransform } from '@angular/core';
import { LocalizationService } from '../services/localization.service';

@Pipe({
  name: 'yesNo'
})
export class YesNoPipe implements PipeTransform {

  constructor(
    private localizationService: LocalizationService,
  ) { }

  transform(value: boolean): unknown {
    switch (value) {
      case true:
        return this.localizationService.translate('Common.Yes');
      case false:
        return this.localizationService.translate('Common.No');
    }
  }

}
