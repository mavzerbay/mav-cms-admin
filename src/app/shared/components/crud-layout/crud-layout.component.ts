import { Component, Input, isDevMode, OnInit, Type, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService, PrimeNGConfig } from 'primeng/api';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Table } from 'primeng/table';
import { CrudLayoutOptions } from '../../models/crud-layout-options';
import { MavDataService } from '../../services/mav-data.service';
import { takeUntil } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IApiResponse } from '../../models/api-response';

@Component({
  selector: 'mav-crud-layout',
  templateUrl: './crud-layout.component.html',
  styleUrls: ['./crud-layout.component.scss'],
  providers: [
    DialogService,
    MessageService,
  ]
})
export class CrudLayoutComponent implements OnInit {

  @ViewChild("dt", { static: true })
  dTable!: Table;

  dataList!: any[];

  totalRecords!: number;

  cols!: any[];

  loading!: boolean;

  selectedDatas!: any[];

  data: any;

  ref!: DynamicDialogRef;

  @Input() crudLayoutOptions!: CrudLayoutOptions<any>;

  constructor(
    private primengConfig: PrimeNGConfig,
    private dataService: MavDataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
  ) { }

  ngOnInit() {
    //varsayılan değerleri atamak için
    this.crudLayoutOptions.showToolBar = this.crudLayoutOptions.showToolBar ?? true;
    this.crudLayoutOptions.showSearch = this.crudLayoutOptions.showSearch ?? true;
    this.crudLayoutOptions.dialogWidth = this.crudLayoutOptions.dialogWidth ?? '60%';
    this.crudLayoutOptions.contentStyle = this.crudLayoutOptions.contentStyle ?? { "max-height": "500px", "overflow": "auto" };

    this.primengConfig.ripple = true;

    console.log(this.crudLayoutOptions);
  }

  loadData(event: LazyLoadEvent) {
    console.log(event);
    this.loading = true
    this.dataService.getDataList<typeof this.crudLayoutOptions.model>(this.crudLayoutOptions.url, event).subscribe((response: IApiResponse<typeof this.crudLayoutOptions.model>) => {
      if (response && response.isSuccess) {
        this.dataList = response.dataMulti;
        this.totalRecords = response.count;
      } else {
        console.log(response);
      }
      this.loading = false;
    }, error => {
      if (isDevMode())
        console.error(error);
    });
  }

  editData(data: typeof this.crudLayoutOptions.model) {
    this.openDialog(data);
  }

  newData() {
    this.openDialog(null);
  }

  openDialog(data: typeof this.crudLayoutOptions.model) {
    this.ref = this.dialogService.open(this.crudLayoutOptions.dialogComponent, {
      data: data?.id,
      header: this.crudLayoutOptions.dialogHeader,
      width: this.crudLayoutOptions.dialogWidth,
      contentStyle: this.crudLayoutOptions.contentStyle,
      baseZIndex: 10000,
      autoZIndex: true,
    });

    this.ref.onClose.subscribe((response: IApiResponse<typeof this.crudLayoutOptions.model>) => {
      if (response && response.dataSingle && response.dataSingle.id) {
        if (response.statusCode == HttpStatusCode.NoContent && this.dataList.some(x => x.id == response.dataSingle.id)) {
          const indexOfElement = this.dataList.findIndex(x => x.id == response.dataSingle.id);
          this.dataList[indexOfElement] = response.dataSingle;
        } else if (response.statusCode == HttpStatusCode.Created) {
          this.dataList.splice(0, 0, response.dataSingle);
        }
      }
    })
  }

  deleteSelectedDatas() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        // this.selectedProducts = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  deleteData(product: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.products = this.products.filter(val => val.id !== product.id);
        // this.product = {};
        // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  filterTable(event: any, field: string, matchMode: string = 'contains') {
    if (event && event.target && event.target.value) {
      this.dTable.filter(event.target.value, field, matchMode);
    }
  }

  filterTableGlobal(event: any) {
    if (event && event.target && event.target.value) {
      this.dTable.filterGlobal(event.target.value, 'contains')
    }
  }

  clearTable() {
    this.dTable.clear();
  }
  get getGlobalFilters() {
    return this.crudLayoutOptions.cols.filter(x => x.isGlobalFilter != null && x.isGlobalFilter == true).map(x => x.field);
  }
}
