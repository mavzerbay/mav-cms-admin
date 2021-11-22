import { Component, isDevMode, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { Language } from 'src/app/models/language';
import { IApiResponse } from 'src/app/shared/models/api-response';
import { MavDataService } from 'src/app/shared/services/mav-data.service';

@Component({
  selector: 'app-language-dialog',
  templateUrl: './language-dialog.component.html',
  styleUrls: ['./language-dialog.component.scss']
})
export class LanguageDialogComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private config: DynamicDialogConfig,
    private dataService: MavDataService,
    private messageService: MessageService,
    private ref: DynamicDialogRef,
  ) { }

  languageId: string = this.config.data;

  formLanguage!: FormGroup;

  private unsubscribe = new Subject();

  ngOnInit(): void {
    this.createLanguageForm();
    if (this.languageId)
      this.getLanguage();
  }

  closeDialog() {
    this.ref.close();
  }

  private createLanguageForm() {
    this.formLanguage = this.formBuilder.group({
      id: [{ value: null, disabled: false }],
      name: [{ value: null, disabled: false }, Validators.required],
      culture: [{ value: null, disabled: false }, Validators.required],
      flagIcon: [{ value: null, disabled: false }, Validators.required],
      isRTL: [{ value: false, disabled: false }, Validators.required],
      activity: [{ value: true, disabled: false }, Validators.required],
      isPrimary: [{ value: false, disabled: false }, Validators.required],
    });
  }

  private getLanguage() {
    this.dataService.getById<Language>(`/Language`, this.languageId).subscribe((response: IApiResponse<Language>) => {
      if (response && response.isSuccess) {
        this.formLanguage.patchValue(response.dataSingle);
      } else {
        if (response.error) {
          let errorMessage;
          for (const key in response.error) {
            if (Object.prototype.hasOwnProperty.call(response.error, key)) {
              if (this.formLanguage.get(key) != null) {
                this.formLanguage.get(key)?.setErrors(Validators.required, response.error[key]);
              }
              errorMessage += response.error[key];
            }
          }
          this.messageService.add({ severity: 'error', summary: 'İşlem Başarısız', detail: errorMessage, life: 3000 });
        }
      }
    }, error => {
      if (isDevMode())
        console.log(error);
    })
  }

  saveLanguage() {
    if (this.formLanguage.valid) {
      this.dataService.saveData<Language>("/Language", this.formLanguage.value).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
        debugger;
        if (response && response.isSuccess) {
          this.ref.close(response);
        } else {
          if (response.error) {
            let errorMessage;
            for (const key in response.error) {
              if (Object.prototype.hasOwnProperty.call(response.error, key)) {
                if (this.formLanguage.get(key) != null) {
                  this.formLanguage.get(key)?.setErrors(Validators.required, response.error[key]);
                }
                errorMessage += response.error[key];
              }
            }
            this.messageService.add({ severity: 'error', summary: 'İşlem Başarısız', detail: errorMessage, life: 3000 });
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
