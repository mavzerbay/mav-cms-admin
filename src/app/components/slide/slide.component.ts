import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Slide } from 'src/app/models/slide';
import { CrudLayoutOptions } from 'src/app/shared/models/crud-layout-options';
import { SlideDialogComponent } from './slide-dialog/slide-dialog.component';

@Component({
  selector: 'app-slide',
  template: '<mav-crud-layout [crudLayoutOptions]="crudOptions"></mav-crud-layout>',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  crudOptions: CrudLayoutOptions<Slide> = {
    url: '/Slide',
    dialogComponent: SlideDialogComponent,
    dialogHeader: "Slide.ControllerTitle",
    deleteProperty: '',
    cols: [
      {
        field: 'crudButtons',
        fieldHeaderName: 'Common.Action',
        type: ''
      },
      {
        field: 'name',
        fieldHeaderName: 'Common.Name',
        type: 'text',
      },
      {
        field: 'page.name',
        fieldHeaderName: 'Page.ControllerTitle',
        type: 'autocomplete',
        typePlaceHolder: 'Page.ControllerTitle',
        autoCompleteUrl: '/Page/GetDropdownList',
        autoCompleteSearchName: 'pageId'
      },
      {
        field: 'slidePosition.name',
        fieldHeaderName: 'Slide.SlidePosition',
        type: 'autocomplete',
        typePlaceHolder: 'Slide.SlidePosition',
        autoCompleteUrl: '/CustomVar/GetDropdownList',
        autoCompleteSearchName: 'slidePositionId',
        customParams: new HttpParams().append('GroupName', 'SlidePosition')
      },
      {
        field: 'isHome',
        fieldHeaderName: 'Slide.IsHome',
        type: 'boolean',
        pipeName: 'yesNo'
      },
      {
        field: 'activity',
        fieldHeaderName: 'Common.Activity',
        type: 'boolean',
        pipeName: 'activity'
      }
    ]
  }
}
