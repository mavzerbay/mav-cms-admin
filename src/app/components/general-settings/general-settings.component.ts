import { Component, isDevMode, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { GeneralSettings } from 'src/app/models/general-settings';
import { IApiResponse } from 'src/app/shared/models/api-response';
import { LocalizationService } from 'src/app/shared/services/localization.service';
import { MavDataService } from 'src/app/shared/services/mav-data.service';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private config: DynamicDialogConfig,
    private dataService: MavDataService,
    private messageService: MessageService,
    private ref: DynamicDialogRef,
    private localizationService:LocalizationService,
  ) { }

  languageId: string = this.config.data;

  formGeneralSettings!: FormGroup;

  private unsubscribe = new Subject();

  ngOnInit(): void {
    this.createGeneralSettingsForm();
    if (this.languageId)
      this.getGeneralSettings();
  }

  closeDialog() {
    this.ref.close();
  }

  private createGeneralSettingsForm() {
    this.formGeneralSettings = this.formBuilder.group({
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

  private getGeneralSettings() {
    this.dataService.getById<GeneralSettings>(`/GeneralSettings`, this.languageId).subscribe((response: IApiResponse<GeneralSettings>) => {
      if (response && response.isSuccess) {
        this.formGeneralSettings.patchValue(response.dataSingle);
      } else {
        if (response.error) {
          let errorMessage;
          for (const key in response.error) {
            if (Object.prototype.hasOwnProperty.call(response.error, key)) {
              if (this.formGeneralSettings.get(key) != null) {
                this.formGeneralSettings.get(key)?.setErrors(Validators.required, response.error[key]);
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

  saveGeneralSettings() {
    if (this.formGeneralSettings.valid) {
      this.dataService.saveData<GeneralSettings>("/GeneralSettings", this.formGeneralSettings.value).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
        if (response && response.isSuccess) {
          this.ref.close(response);
        } else {
          if (response.error) {
            let errorMessage;
            for (const key in response.error) {
              if (Object.prototype.hasOwnProperty.call(response.error, key)) {
                if (this.formGeneralSettings.get(key) != null) {
                  this.formGeneralSettings.get(key)?.setErrors(Validators.required, response.error[key]);
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

