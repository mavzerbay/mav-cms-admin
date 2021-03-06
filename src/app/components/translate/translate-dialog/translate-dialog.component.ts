import { Component, isDevMode, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { Translate } from 'src/app/models/translate';
import { IApiResponse } from 'src/app/shared/models/api-response';
import { MavDataService } from 'src/app/shared/services/mav-data.service';
import { MavUtilsService } from 'src/app/shared/services/mav-utils.service';

@Component({
  selector: 'app-translate-dialog',
  templateUrl: './translate-dialog.component.html',
  styleUrls: ['./translate-dialog.component.scss']
})
export class TranslateDialogComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private config: DynamicDialogConfig,
    private dataService: MavDataService,
    private messageService: MessageService,
    private ref: DynamicDialogRef,
    private utilsService: MavUtilsService,
  ) { }

  TranslateId: string = this.config.data;

  formTranslate!: FormGroup;

  private unsubscribe = new Subject();

  ngOnInit(): void {
    this.createTranslateForm();
    if (this.TranslateId)
      this.getTranslate();
  }

  closeDialog() {
    this.ref.close();
  }

  private createTranslateForm() {
    this.formTranslate = this.formBuilder.group({
      id: [{ value: null, disabled: false }],
      language: [{ value: null, disabled: false }],
      languageId: [{ value: null, disabled: false }, Validators.required],
      keyName: [{ value: null, disabled: false }, Validators.required],
      translation: [{ value: null, disabled: false }, Validators.required],
      explanation: [{ value: null, disabled: false }],
    });

    this.formTranslate.get('language')?.valueChanges.subscribe(val => {
      if (val && val.id)
        this.formTranslate.get('languageId')?.setValue(val.id);
      else
        this.formTranslate.get('languageId')?.setValue(null);
    });

  }

  private getTranslate() {
    this.dataService.getById<Translate>(`/Translate`, this.TranslateId).subscribe((response: IApiResponse<Translate>) => {
      if (response && response.isSuccess) {
        this.formTranslate.patchValue(response.dataSingle);
      } else {
        if (response.errors) {
          this.utilsService.markFormErrors(this.formTranslate, response.errors, this.messageService);
        }
      }
    }, (error: any) => {
      if (isDevMode())
        console.log(error);
    })
  }

  saveTranslate() {
    if (this.formTranslate.valid) {
      this.dataService.saveData<Translate>("/Translate", this.formTranslate.value).pipe(takeUntil(this.unsubscribe)).subscribe((response: IApiResponse<Translate>) => {
        if (response && response.isSuccess) {
          this.ref.close(response);
        } else {
          if (response.errors) {
            this.utilsService.markFormErrors(this.formTranslate, response.errors, this.messageService);
          }
          this.messageService.add({ severity: 'error', summary: '????lem Ba??ar??s??z', detail: response.message, life: 3000 });
        }
      }, (error: any) => {
        if (isDevMode())
          console.log(error);
      })
    }
  }

}
