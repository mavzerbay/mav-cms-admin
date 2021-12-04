import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';
import { CrudLayoutOptions } from 'src/app/shared/models/crud-layout-options';
import { MenuDialogComponent } from './menu-dialog/menu-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  crudOptions: CrudLayoutOptions<Menu> = {
    url: '/Menu',
    dialogComponent: MenuDialogComponent,
    dialogHeader: "Menü",
    deleteProperty: 'menuTrans[0].name',
    cols: [
      {
        field: 'crudButtons',
        fieldHeaderName: 'İşlem',
        type: ''
      },
      {
        field: 'menuTrans[0].name',
        fieldHeaderName: 'Adı',
        type: 'text',
        isGlobalFilter: true,
      },
      {
        field: 'parentMenu.name',
        fieldHeaderName: 'Üst Menü Adı',
        type: 'text',
        isGlobalFilter: true,
      },
      {
        field: 'displayOrder',
        fieldHeaderName: 'Sıralama',
        type: 'numeric',
        isGlobalFilter: true,
      },
      {
        field: 'isBackend',
        fieldHeaderName: 'Admin Menüsü',
        type: 'boolean',
        isGlobalFilter: true,
      }
    ]
  }

}
