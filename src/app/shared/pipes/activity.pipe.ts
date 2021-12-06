import { Pipe, PipeTransform } from '@angular/core';
import { LocalizationService } from '../services/localization.service';

@Pipe({
  name: 'activity'
})
export class ActivityPipe implements PipeTransform {

  constructor(
    private localizationService: LocalizationService,
  ) { }

  transform(value: boolean): unknown {
    switch (value) {
      case true:
        return this.localizationService.translate('Common.Active');
      case false:
        return this.localizationService.translate('Common.Passive');
    }
  }
}
