import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LazyLoadEvent, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MavUtilsService {

  constructor(
  ) { }

  lazyLoadToCustomParams(event: LazyLoadEvent): HttpParams {
    let customParams = new HttpParams();
    if (event) {
      customParams = customParams.append("PageIndex", (event.first ?? 0) / (event.rows ?? 10) + 1);
      customParams = customParams.append("PageSize", event.rows ?? 10);

      if (event.sortOrder && event.sortField) {
        const sortField = event.sortField.includes('[0]') ? event.sortField.replace('[0]', '') : event.sortField;
        if (event.sortOrder == 1)
          customParams = customParams.append("Sort", `${sortField}Asc`)
        else if (event.sortOrder == -1)
          customParams = customParams.append("Sort", `${sortField}Desc`)
      }
      if (event.filters) {
        let matchModes: string = '';
        for (const key in event.filters) {
          if (Object.prototype.hasOwnProperty.call(event.filters, key)) {
            const element = event.filters[key];
            if (element.value != null) {
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

  //https://gist.github.com/ghinda/8442a57f22099bdb2e34
  objectToFormData(object: any, form?: FormData, namespace?: string): FormData {
    const formData = form || new FormData();
    for (let property in object) {
      if (!object.hasOwnProperty(property) || object[property] == null || object[property] == undefined) continue;

      const formKey = namespace ? `${namespace}[${property}]` : property;
      if (object[property] instanceof Date)
        formData.append(formKey, object[property].toISOString());
      else if (object[property] instanceof File)
        formData.append(formKey, object[property]);
      else if (object[property] instanceof Array) {
        for (let i = 0; i < object[property].length; i++) {
          const element = object[property][i];
          const tempFormKey = `${formKey}[${i}]`;
          if (object[property][i] instanceof File) 
            formData.append(formKey, object[property][i]);
          else if (typeof object[property][i] === 'object')
            this.objectToFormData(element, formData, tempFormKey);
          else
            formData.append(tempFormKey, element.toString());
        }
      }
      else if (typeof object[property] === 'object')
        this.objectToFormData(object[property], formData, formKey);
      else
        formData.append(formKey, object[property].toString());
    }
    return formData;
  }

  markFormErrors(form: FormGroup, errors: any[], messageService: MessageService) {
    let errorMessage: string = '';
    for (const key in errors) {
      let keyAsCamelCase = key.toCamelCase();
      if (keyAsCamelCase.endsWith('Id'))
        keyAsCamelCase = keyAsCamelCase.replace('Id', '');
      if (Object.prototype.hasOwnProperty.call(errors, key)) {
        if (form.get(keyAsCamelCase) != null) {
          form.get(keyAsCamelCase)?.setErrors({ required: errors[key] });
          form.get(keyAsCamelCase)?.markAsDirty();
        }
        errorMessage += errors[key];
      }
    }
    form.updateValueAndValidity();
    messageService.add({ key: 'menu-toast', severity: 'error', summary: '????lem Ba??ar??s??z', detail: errorMessage, life: 5000 });
  }

}
