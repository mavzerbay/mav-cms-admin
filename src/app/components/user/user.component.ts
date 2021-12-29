import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { CrudLayoutOptions } from 'src/app/shared/models/crud-layout-options';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-user',
  template: '<mav-crud-layout [crudLayoutOptions]="crudOptions"></mav-crud-layout>',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  crudOptions: CrudLayoutOptions<AppUser> = {
    url: '/AppUser',
    dialogComponent: UserDialogComponent,
    dialogHeader: "AppUser.ControllerTitle",
    deleteProperty: 'nameSurname',
    cols: [
      {
        field: 'crudButtons',
        fieldHeaderName: 'Common.Action',
        type: ''
      },
      {
        field: 'nameSurname',
        fieldHeaderName: 'AppUser.NameSurname',
        type: 'text',
        isGlobalFilter: true,
      },
      {
        field: 'email',
        fieldHeaderName: 'Common.Email',
        type: 'text',
        isGlobalFilter: true,
      },
      {
        field: 'userName',
        fieldHeaderName: 'AppUser.UserName',
        type: 'text',
        isGlobalFilter: true,
      },
      {
        field: 'phoneNumber',
        fieldHeaderName: 'Common.PhoneNumber',
        type: 'text',
        isGlobalFilter: true,
      }
    ]
  }
}
