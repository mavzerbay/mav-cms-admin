import { Component, OnInit } from '@angular/core';
import { CustomVar } from 'src/app/models/custom-var';
import { CrudLayoutOptions } from 'src/app/shared/models/crud-layout-options';
import { LocalizationService } from 'src/app/shared/services/localization.service';
import { CustomVarDialogComponent } from './custom-var-dialog/custom-var-dialog.component';

@Component({
  selector: 'app-custom-var',
  template:'<mav-crud-layout [crudLayoutOptions]="crudOptions"></mav-crud-layout>',
  styleUrls: ['./custom-var.component.scss']
})
export class CustomVarComponent implements OnInit {

  constructor(
    private localizationService: LocalizationService,
  ) { }

  ngOnInit(): void {
  }

  translate(keyName: string) {
    return this.localizationService.translate(keyName);
  }
  crudOptions: CrudLayoutOptions<CustomVar> = {
    url: '/CustomVar',
    dialogComponent: CustomVarDialogComponent,
    dialogHeader: 'CustomVar.ControllerTitle',
    deleteProperty:'customVarTrans[0].name',
    cols: [
      {
        field: 'crudButtons',
        fieldHeaderName: 'İşlem',
        type: ''
      },
      {
        field: 'groupName',
        fieldHeaderName: 'Anahtar Adı',
        type: 'text',
        isGlobalFilter: true,
      },
      {
        field: 'keyName',
        fieldHeaderName: 'Anahtar Adı',
        type: 'text',
        isGlobalFilter: true,
      },
      {
        field: 'customVarTrans[0].name',
        fieldHeaderName: 'Çeviri',
        type: 'text',
        isGlobalFilter: true,
      },
      {
        field: 'customVarTrans[0].description',
        fieldHeaderName: 'Açıklama',
        type: 'text',
        isGlobalFilter: true,
      }
    ]
  }
}
