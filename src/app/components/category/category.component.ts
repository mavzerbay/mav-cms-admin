import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CrudLayoutOptions } from 'src/app/shared/models/crud-layout-options';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';

@Component({
  selector: 'app-category',
  template: '<mav-crud-layout [crudLayoutOptions]="crudOptions"></mav-crud-layout>',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  crudOptions: CrudLayoutOptions<Category> = {
    url: '/Category',
    dialogComponent: CategoryDialogComponent,
    dialogHeader: "Category.ControllerTitle",
    deleteProperty: 'categoryTrans[0].name',
    cols: [
      {
        field: 'crudButtons',
        fieldHeaderName: 'Common.Action',
        type: ''
      },
      {
        field: 'categoryTrans[0].name',
        fieldHeaderName: 'Common.Name',
        type: 'text',
        isGlobalFilter: true,
      },
      {
        field: 'categoryTrans[0].info',
        fieldHeaderName: 'Common.Info',
        type: 'text',
        isGlobalFilter: true,
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
