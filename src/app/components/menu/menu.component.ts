import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';
import { CrudLayoutOptions } from 'src/app/shared/models/crud-layout-options';
import { MenuDialogComponent } from './menu-dialog/menu-dialog.component';

@Component({
  selector: 'app-menu',
  template: '<mav-crud-layout [crudLayoutOptions]="crudOptions"></mav-crud-layout>',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  crudOptions: CrudLayoutOptions<Menu> = {
    url: '/Menu',
    dialogComponent: MenuDialogComponent,
    dialogHeader: "Menu.ControllerTitle",
    deleteProperty: 'menuTrans[0].name',
    cols: [
      {
        field: 'crudButtons',
        fieldHeaderName: 'Common.Action',
        type: ''
      },
      {
        field: 'menuTrans[0].name',
        fieldHeaderName: 'Common.Name',
        type: 'text',
        isGlobalFilter: true,
      },
      {
        field: 'parentMenu.name',
        fieldHeaderName: 'Menu.ParentMenu',
        type: 'text',
        isGlobalFilter: true,
      },
      {
        field: 'displayOrder',
        fieldHeaderName: 'Common.DisplayOrder',
        type: 'numeric',
      },
      {
        field: 'isBackend',
        fieldHeaderName: 'Menu.IsBackend',
        type: 'boolean',
        pipeName:'yesNo'
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
