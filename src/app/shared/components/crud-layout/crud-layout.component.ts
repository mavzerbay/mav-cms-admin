import { Component, Input, isDevMode, OnInit, Type, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService, PrimeNGConfig } from 'primeng/api';
import { HttpParams, HttpStatusCode } from '@angular/common/http';
import { Table } from 'primeng/table';
import { CrudLayoutOptions } from '../../models/crud-layout-options';
import { MavDataService } from '../../services/mav-data.service';
import { Subject, takeUntil } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IApiResponse } from '../../models/api-response';
import { BaseDropdownResponse } from '../../models/base-dropdown-response';
import { LocalizationService } from '../../services/localization.service';
import { StringFormatPipe } from '../../pipes/string-format.pipe';

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

  dataList: any[] = [];

  totalRecords: number = 0;

  cols!: any[];

  loading!: boolean;

  selectedDatas!: any[];

  data: any;

  ref!: DynamicDialogRef;

  suggestions!: any[];

  selectedItem!: any;

  @Input() crudLayoutOptions!: CrudLayoutOptions<any>;

  private unsubscribe = new Subject();

  constructor(
    private dataService: MavDataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private localizationService: LocalizationService,
  ) { }

  ngOnInit() {
    //varsayılan değerleri atamak için
    this.crudLayoutOptions.showToolBar = this.crudLayoutOptions.showToolBar ?? true;
    this.crudLayoutOptions.showSearch = this.crudLayoutOptions.showSearch ?? true;
    this.crudLayoutOptions.dialogWidth = this.crudLayoutOptions.dialogWidth ?? '60%';
    this.crudLayoutOptions.contentStyle = this.crudLayoutOptions.contentStyle ?? { "max-height": "500px", "overflow": "auto" };
    this.crudLayoutOptions.deleteProperty = this.crudLayoutOptions.deleteProperty ?? 'name';

  }

  loadData(event: LazyLoadEvent) {
    this.loading = true
    this.dataService.getDataList<typeof this.crudLayoutOptions.model>(this.crudLayoutOptions.url, event).pipe(takeUntil(this.unsubscribe)).subscribe((response: IApiResponse<typeof this.crudLayoutOptions.model>) => {
      if (response && response.isSuccess) {
        this.dataList = response.dataMulti;
        this.totalRecords = response.count;
      } else {
        if (response.error) {
          let errorMessage;
          for (const key in response.error) {
            if (Object.prototype.hasOwnProperty.call(response.error, key)) {
              errorMessage += response.error[key];
            }
          }
          this.messageService.add({ severity: 'error', summary: 'İşlem Başarısız', detail: errorMessage, life: 3000 });
        } else if (response.message) {
          this.messageService.add({ severity: 'error', summary: 'İşlem Başarısız', detail: response.message, life: 3000 });
        }
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
      header: this.translate(this.crudLayoutOptions.dialogHeader),
      width: this.crudLayoutOptions.dialogWidth,
      contentStyle: this.crudLayoutOptions.contentStyle,
      baseZIndex: 10000,
      autoZIndex: true
    });

    this.ref.onClose.subscribe((response: IApiResponse<typeof this.crudLayoutOptions.model>) => {
      if (response && response.dataSingle && response.dataSingle.id) {
        if (response.statusCode == HttpStatusCode.NoContent && this.dataList.some(x => x.id == response.dataSingle.id)) {
          const indexOfElement = this.dataList.findIndex(x => x.id == response.dataSingle.id);
          this.dataList[indexOfElement] = response.dataSingle;
        } else if (response.statusCode == HttpStatusCode.Created) {
          this.dataList.splice(0, 0, response.dataSingle);
        }
        this.messageService.add({ severity: 'success', summary: this.translate('Common.Successfully'), detail: response.message, life: 3000 });
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

  deleteData(data: any) {
    let message = this.translate('Common.AreYouSureToDelete');
    if (this.crudLayoutOptions.deleteProperty && this.crudLayoutOptions.deleteProperty !== '')
      message = new StringFormatPipe().transform(message, this.objectByString(data, this.crudLayoutOptions.deleteProperty!));
    else
      message = new StringFormatPipe().transform(message, '');
    this.confirmationService.confirm({
      message: message,
      header: this.translate('Common.AreYouSureToDelete'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.delete(this.crudLayoutOptions.url, data.id).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
          if (response && response.isSuccess) {
            const deletedItemIndex = this.dataList.findIndex(x => x.id == data.id);
            this.dataList.splice(deletedItemIndex, 1);
            this.messageService.add({ severity: 'success', summary: 'Silme işlemi başarılı', life: 3000 });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Silme işlemi başarısız', life: 3000 });
          }
        });
      }
    });
  }

  filterTable(event: any, field: string, matchMode: string = 'contains') {
    if (event && event.target && event.target.value) {
      this.dTable.filter(event.target.value, field, matchMode);
    }
  }

  filterTableFromAutoComplete(event: any, field: string) {
    this.dTable.filter(event.id, field, 'contains');
  }

  filterTableGlobal(event: any) {
    if (event && event.target && event.target.value) {
      this.dTable.filterGlobal(event.target.value, 'contains')
    }
  }

  clearTable() {
    this.selectedItem = null;
    this.dTable.clear();
  }
  get getGlobalFilters() {
    return this.crudLayoutOptions.cols.filter(x => x.isGlobalFilter != null && x.isGlobalFilter == true).map(x => x.field);
  }

  translate(keyName: string) {
    return this.localizationService.translate(keyName);
  }

  filterData(event: any, suggestionUrl: string, customParams?: HttpParams) {
    const query = event && event.query ? event.query : null;
    this.dataService.getDropdownDataList<BaseDropdownResponse>(suggestionUrl, query, customParams).pipe(takeUntil(this.unsubscribe)).subscribe((response) => {
      if (response && response.isSuccess) {
        this.suggestions = response.dataMulti;
      } else {
        this.suggestions = []
      }
    })
  }


  objectByString(data: any, key: string) {
    key = key.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    key = key.replace(/^\./, '');           // strip a leading dot
    var a = key.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k == "0" && a[i - 1].includes('Trans')) {
        k = this.filterByUserLanguage(data).toString();
      }
      if (k in data) {
        data = data[k];
      } else {
        return;
      }
    }
    if (!data) {
      return '';
    }
    return data;
  }

  filterByUserLanguage(data: any[]): number {
    return data.findIndex(x => x.languageId == this.localizationService.getPrimaryLanguage?.id);
  }
}
