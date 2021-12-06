import { Component, OnInit } from '@angular/core';
import { CrudLayoutOptions } from 'src/app/shared/models/crud-layout-options';
import { Language } from 'src/app/models/language';
import { LanguageDialogComponent } from './language-dialog/language-dialog.component';

@Component({
  selector: 'app-language',
  template: '<mav-crud-layout [crudLayoutOptions]="crudOptions"></mav-crud-layout>',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  crudOptions: CrudLayoutOptions<Language> = {
    url: '/Language',
    dialogComponent: LanguageDialogComponent,
    dialogHeader: "Language.ControllerTitle",
    cols: [
      {
        field: 'crudButtons',
        fieldHeaderName: 'İşlem',
        type: ''
      },
      {
        field: 'name',
        fieldHeaderName: 'Adı',
        type: 'text',
        typePlaceHolder: 'Ada göre ara',
        isGlobalFilter: true,
      },
      {
        field: 'isPrimary',
        fieldHeaderName: 'Birincil',
        type: 'boolean'
      },
      {
        field: 'activity',
        fieldHeaderName: 'Durum',
        type: 'boolean'
      },
    ]
  }
}
