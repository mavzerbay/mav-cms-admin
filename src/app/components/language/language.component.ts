import { Component, OnInit } from '@angular/core';
import { CrudLayoutOptions } from 'src/app/shared/models/crud-layout-options';
import { Language } from 'src/app/models/language';
import { LanguageDialogComponent } from './language-dialog/language-dialog.component';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  crudOptions: CrudLayoutOptions<Language> = {
    url: '/Language',
    dialogComponent: LanguageDialogComponent,
    dialogHeader: "Dil",
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
        type: ''
      },
      {
        field: 'activity',
        fieldHeaderName: 'Durum',
        type: 'trueFalse'
      },
    ]
  }
}
