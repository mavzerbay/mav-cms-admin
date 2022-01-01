import { Component, OnInit } from '@angular/core';
import { SupportTicket } from 'src/app/models/support-ticket';
import { CrudLayoutOptions } from 'src/app/shared/models/crud-layout-options';
import { SupportTicketDialogComponent } from './support-ticket-dialog/support-ticket-dialog.component';

@Component({
  selector: 'app-support-ticket',
  template: '<mav-crud-layout [crudLayoutOptions]="crudOptions"></mav-crud-layout>',
  styleUrls: ['./support-ticket.component.scss']
})
export class SupportTicketComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  crudOptions: CrudLayoutOptions<SupportTicket> = {
    url: '/SupportTicket',
    dialogComponent: SupportTicketDialogComponent,
    dialogHeader: "SupportTicket.ControllerTitle",
    showSearch: false,
    showToolBar: false,
    cols: [
      {
        field: 'crudButtons',
        fieldHeaderName: 'İşlem',
        type: ''
      },
      {
        field: 'nameSurname',
        fieldHeaderName: 'Common.NameSurname',
        type: 'text',
        typePlaceHolder: 'Common.SearchByName',
        isGlobalFilter: true,
      },
      {
        field: 'email',
        fieldHeaderName: 'Common.Email',
        typePlaceHolder: 'Common.SearchByEmail',
        type: 'text',
        isGlobalFilter: true,
      },
      {
        field: 'phoneNumber',
        fieldHeaderName: 'Common.PhoneNumber',
        typePlaceHolder: 'Common.SearchByPhoneNumber',
        type: 'text',
        isGlobalFilter: true,
      },
      {
        field: 'supportType.name',
        fieldHeaderName: 'SupportTicket.SupportType',
        type: 'autocomplete',
        typePlaceHolder: 'SupportTicket.SelectSupportType',
        autoCompleteUrl: '/Language/GetDropdownList',
        autoCompleteSearchName: 'supportTypeId'
      },
      {
        field: 'isClosed',
        fieldHeaderName: 'SupportTicket.IsClosed',
        type: 'boolean',
        pipeName: 'yesNo'
      },
    ]
  }
}
