import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ControlContainer, FormArray } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { SlideMedia } from 'src/app/models/slide';
import { StringFormatPipe } from 'src/app/shared/pipes/string-format.pipe';
import { LocalizationService } from 'src/app/shared/services/localization.service';
import { SlideMediaDialogComponent } from '../slide-media-dialog/slide-media-dialog.component';

@Component({
  selector: 'app-slide-media',
  templateUrl: './slide-media.component.html',
  styleUrls: ['./slide-media.component.scss'],
  providers: [
    DialogService,
    MessageService,
  ]
})
export class SlideMediaComponent implements OnInit, AfterViewInit {

  @ViewChild("dt", { static: true })
  dTable!: Table;

  slideMediaList: any[] = [];

  totalRecords: number = 0;

  cols!: any[];

  loading!: boolean;

  selectedSlideMedias!: any[];

  slideMedia: any;

  ref!: DynamicDialogRef;

  suggestions!: any[];

  selectedItem!: any;

  @Output() onNewSlide: EventEmitter<void> = new EventEmitter();
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private localizationService: LocalizationService,
    private controlContainer: ControlContainer,
  ) { }

  ngAfterViewInit(): void {
    this.slideMedias.valueChanges.subscribe((val) => {
      this.slideMediaList = val;
    })
  }

  get slideMedias() {
    return <FormArray>this.controlContainer.control?.get('slideMedias');
  }

  ngOnInit(): void {
  }

  translate(keyName: string) {
    return this.localizationService.translate(keyName);
  }

  editSlideMedia(slideMedia: SlideMedia) {
    this.openDialog(slideMedia);
  }

  newSlideMedia() {
    this.onNewSlide.emit();
    this.openDialog(null);
  }

  openDialog(slideMedia: SlideMedia | null) {
    this.ref = this.dialogService.open(SlideMediaDialogComponent, {
      data: slideMedia?.id,
      header: this.translate('SlideMedia.ControllerTitle'),
      width: '60%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10001,
      autoZIndex: true
    });

    this.ref.onClose.subscribe((response: SlideMedia) => {
      if (response) {

      }
    })
  }

  deleteSelectedSlideMedias() {
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

  deleteSlideMedia(slideMedia: SlideMedia) {
    let message = this.translate('Common.AreYouSureToDelete');
    this.confirmationService.confirm({
      message: new StringFormatPipe().transform(message, slideMedia.title),
      header: this.translate('Common.Approvement'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const index = this.slideMedias.value.indexOf(slideMedia);
        this.slideMedias.removeAt(index);
      }
    });
  }

  clearTable() {
    this.selectedItem = null;
    this.dTable.clear();
  }

  closeDialog() {
    this.ref.close();
  }

  tableData: SlideMedia[] = [];
  loadSlideMedia(event: LazyLoadEvent) {
    this.loading = true;

    if (event) {
      if (event.sortOrder && event.sortField) {
        const sortField = event.sortField.includes('[0]') ? event.sortField.replace('[0]', '') : event.sortField;
        if (event.sortOrder == 1)
          this.tableData = this.slideMediaList.sort((a, b) => a[sortField] > b[sortField] ? 1 : a[sortField] < b[sortField] ? -1 : 0);
        else if (event.sortOrder == -1)
          this.tableData = this.slideMediaList.sort((a, b) => a[sortField] > b[sortField] ? -1 : a[sortField] < b[sortField] ? 1 : 0);
      }
      // if (event.filters) {
      //   let matchModes: string = '';
      //   for (const key in event.filters) {
      //     if (Object.prototype.hasOwnProperty.call(event.filters, key)) {
      //       const element = event.filters[key];
      //       if (element.value != null) {
      //         customParams = customParams.append(key, element.value);
      //         matchModes += `${key}:${element.matchMode},`;
      //       }
      //     }
      //   }
      //   if (matchModes != '')
      //     customParams = customParams.append("MatchMode", matchModes);
      // }

      const start = (event.first ?? 0) * (event.rows ?? 10);
      const end = start + (event.rows ?? 10);
      this.tableData = this.tableData.slice(start, end);
    }

    this.loading = false;
  }
}
