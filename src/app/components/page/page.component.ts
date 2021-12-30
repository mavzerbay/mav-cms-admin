import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/models/page';
import { CrudLayoutOptions } from 'src/app/shared/models/crud-layout-options';
import { PageDialogComponent } from './page-dialog/page-dialog.component';

@Component({
  selector: 'app-page',
  template: '<mav-crud-layout [crudLayoutOptions]="crudOptions"></mav-crud-layout>',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  crudOptions: CrudLayoutOptions<Page> = {
    url: '/Page',
    dialogComponent: PageDialogComponent,
    dialogHeader: "Page.ControllerTitle",
    deleteProperty: 'pageTrans[0].name',
    cols: [
      {
        field: 'crudButtons',
        fieldHeaderName: 'Common.Action',
        type: ''
      },
      {
        field: 'pageTrans[0].name',
        fieldHeaderName: 'Common.Name',
        type: 'text',
        isGlobalFilter: true,
      },
      {
        field: 'parentPage.name',
        fieldHeaderName: 'Page.ParentPage',
        type: 'text',
      },
      {
        field: 'category.name',
        fieldHeaderName: 'Category.ControllerTitle',
        type: 'text',
      },
      {
        field: 'activity',
        fieldHeaderName: 'Common.Activity',
        type: 'boolean',
        pipeName:'activity'
      }
    ]
  }

}
