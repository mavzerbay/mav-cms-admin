import { HttpParams } from '@angular/common/http';
import { Component, isDevMode, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { SupportTicket } from 'src/app/models/support-ticket';
import { IApiResponse } from 'src/app/shared/models/api-response';
import { LocalizationService } from 'src/app/shared/services/localization.service';
import { MavDataService } from 'src/app/shared/services/mav-data.service';
import { MavUtilsService } from 'src/app/shared/services/mav-utils.service';

@Component({
  selector: 'app-support-ticket-dialog',
  templateUrl: './support-ticket-dialog.component.html',
  styleUrls: ['./support-ticket-dialog.component.scss']
})
export class SupportTicketDialogComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private config: DynamicDialogConfig,
    private dataService: MavDataService,
    private messageService: MessageService,
    private ref: DynamicDialogRef,
    private localizationService: LocalizationService,
    private utilsService: MavUtilsService,
  ) { }

  languageId: string = this.config.data;

  formSupportTicket!: FormGroup;

  private unsubscribe = new Subject();

  supportTicket!: SupportTicket;

  ngOnInit(): void {
    this.createSupportTicketForm();
    if (this.languageId)
      this.getSupportTicket();
  }

  closeDialog() {
    this.ref.close();
  }

  supportTypeCustomParams: HttpParams = new HttpParams().append("GroupName", "SupportType");

  private createSupportTicketForm() {
    this.formSupportTicket = this.formBuilder.group({
      id: [{ value: null, disabled: true }, Validators.required],
      name: [{ value: null, disabled: true }, Validators.required],
      surname: [{ value: null, disabled: true }, Validators.required],
      email: [{ value: null, disabled: true }],
      phoneNumber: [{ value: null, disabled: true }],
      content: [{ value: null, disabled: true }, Validators.required],
      supportType: [{ value: null, disabled: true }, Validators.required],
      supportTypeId: [{ value: null, disabled: true }, Validators.required],
      isClosed: [{ value: false, disabled: false }, Validators.required],
    });
  }

  translate(keyName: string) {
    return this.localizationService.translate(keyName);
  }

  private getSupportTicket() {
    this.dataService.getById<SupportTicket>(`/SupportTicket`, this.languageId).subscribe((response: IApiResponse<SupportTicket>) => {
      if (response && response.isSuccess) {
        this.supportTicket = response.dataSingle;
        this.formSupportTicket.patchValue(response.dataSingle);
      } else {
        if (response.errors) {
          this.utilsService.markFormErrors(this.formSupportTicket, response.errors, this.messageService);
        }
      }
    }, error => {
      if (isDevMode())
        console.log(error);
    })
  }

  saveSupportTicket() {
    if (this.formSupportTicket.valid) {
      this.supportTicket.isClosed = this.formSupportTicket.value.isClosed;
      this.dataService.saveData<SupportTicket>("/SupportTicket", this.supportTicket).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
        if (response && response.isSuccess) {
          this.ref.close(response);
        } else {
          if (response.errors) {
            this.utilsService.markFormErrors(this.formSupportTicket, response.errors, this.messageService);
          }
          this.messageService.add({ severity: 'error', summary: 'İşlem Başarısız', detail: response.message, life: 3000 });
        }
      }, error => {
        if (isDevMode())
          console.log(error);
      })
    }
  }

}
