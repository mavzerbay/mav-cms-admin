import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MavUtilsService {

  constructor() { }

  lazyLoadToCustomParams(event: LazyLoadEvent): HttpParams {
    let customParams = new HttpParams();
    if (event) {
      customParams = customParams.append("PageIndex", (event.first ?? 0) + 1);
      customParams = customParams.append("PageSize", event.rows ?? 10);

      if (event.sortOrder && event.sortField && event.sortOrder == 1)
        customParams = customParams.append("Sort", `${event.sortField}Asc`)
      else if (event.sortOrder && event.sortField && event.sortOrder == -1)
        customParams = customParams.append("Sort", `${event.sortField}Desc`)

      if (event.filters) {
        let matchModes: string = '';
        for (const key in event.filters) {
          if (Object.prototype.hasOwnProperty.call(event.filters, key)) {
            const element = event.filters[key];
            if (element.value) {
              customParams = customParams.append(key, element.value);
              matchModes += `${key}:${element.matchMode},`;
            }
          }
        }
        if (matchModes != '')
          customParams = customParams.append("MatchMode", matchModes);
      }

      if (event.globalFilter)
        customParams = customParams.append("Search", event.globalFilter);

    }

    return customParams;
  }
}
