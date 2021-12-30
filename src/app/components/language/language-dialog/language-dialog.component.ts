import { Component, isDevMode, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { Language } from 'src/app/models/language';
import { IApiResponse } from 'src/app/shared/models/api-response';
import { LocalizationService } from 'src/app/shared/services/localization.service';
import { MavDataService } from 'src/app/shared/services/mav-data.service';
import { MavUtilsService } from 'src/app/shared/services/mav-utils.service';

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
    private localizationService: LocalizationService,
    private utilsService: MavUtilsService,
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
      displayOrder: [{ value: 0, disabled: false }, Validators.required],
    });
  }

  translate(keyName: string) {
    return this.localizationService.translate(keyName);
  }

  private getLanguage() {
    this.dataService.getById<Language>(`/Language`, this.languageId).subscribe((response: IApiResponse<Language>) => {
      if (response && response.isSuccess) {
        this.formLanguage.patchValue(response.dataSingle);
      } else {
        if (response.errors) {
          this.utilsService.markFormErrors(this.formLanguage, response.errors, this.messageService);
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
        if (response && response.isSuccess) {
          this.ref.close(response);
        } else {
          if (response.errors) {
            this.utilsService.markFormErrors(this.formLanguage, response.errors, this.messageService);
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
