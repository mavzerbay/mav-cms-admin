import { Component, OnInit } from '@angular/core';
import { Translate } from 'src/app/models/translate';
import { CrudLayoutOptions } from 'src/app/shared/models/crud-layout-options';
import { TranslateDialogComponent } from './translate-dialog/translate-dialog.component';

@Component({
  selector: 'app-translate',
  template: '<mav-crud-layout [crudLayoutOptions]="crudOptions"></mav-crud-layout>',
  styleUrls: ['./translate.component.scss']
})
export class TranslateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  crudOptions: CrudLayoutOptions<Translate> = {
    url: '/Translate',
    dialogComponent: TranslateDialogComponent,
    dialogHeader: "Translate.ControllerTitle",
    deleteProperty: 'keyName',
    cols: [
      {
        field: 'crudButtons',
        fieldHeaderName: 'İşlem',
        type: ''
      },
      {
        field: 'language.name',
        fieldHeaderName: 'Dil',
        type: 'autocomplete',
        typePlaceHolder: 'Dil seçiniz',
        autoCompleteUrl: '/Language/GetDropdownList',
        autoCompleteSearchName: 'languageId'
      },
      {
        field: 'keyName',
        fieldHeaderName: 'Anahtar Adı',
        type: 'text',
        isGlobalFilter: true,
      },
      {
        field: 'translation',
        fieldHeaderName: 'Çeviri',
        type: 'text',
        isGlobalFilter: true,
      },
      {
        field: 'explanation',
        fieldHeaderName: 'Açıklama',
        type: 'text',
        isGlobalFilter: true,
      }
    ]
  }
}
