import { Component, isDevMode, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CustomVar, CustomVarTrans } from 'src/app/models/custom-var';
import { Language } from 'src/app/models/language';
import { IApiResponse } from 'src/app/shared/models/api-response';
import { LocalizationService } from 'src/app/shared/services/localization.service';
import { MavDataService } from 'src/app/shared/services/mav-data.service';

@Component({
  selector: 'app-custom-var-dialog',
  templateUrl: './custom-var-dialog.component.html',
  styleUrls: ['./custom-var-dialog.component.scss']
})
export class CustomVarDialogComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private config: DynamicDialogConfig,
    private dataService: MavDataService,
    private messageService: MessageService,
    private ref: DynamicDialogRef,
    private localizationService: LocalizationService,
  ) { }

  languageId: string = this.config.data;

  formCustomVar!: FormGroup;

  private unsubscribe = new Subject();

  primaryLanguage = this.localizationService.getPrimaryLanguage;

  language$!: Observable<Language[]>;

  ngOnInit(): void {
    this.language$ = this.localizationService.language$;
    this.language$.subscribe((val) => {
      if (val && val.length > 0) {
        this.createCustomVarForm();
        if (this.languageId)
          this.getCustomVar();
      } else {
        this.closeDialog();
      }
    });
  }

  closeDialog() {
    this.ref.close();
  }

  translate(keyName: string) {
    return this.localizationService.translate(keyName);
  }

  private patchFormValue(data: CustomVar) {
    const primaryTrans = data.customVarTrans.find(x => x.languageId == this.primaryLanguage?.id);
    data.customVarTrans = data.customVarTrans.filter(x => x.languageId != this.primaryLanguage?.id);

    this.formCustomVar.patchValue(data);
    this.formCustomVar.patchValue({ primaryCustomVarTrans: [primaryTrans] });
  }

  private createCustomVarForm() {
    this.formCustomVar = this.formBuilder.group({
      id: [{ value: null, disabled: false }],
      groupName: [{ value: null, disabled: false }, Validators.required],
      keyName: [{ value: null, disabled: false }, Validators.required],
      primaryCustomVarTrans: this.formBuilder.array(this.localizationService.getLanguageList.filter(x => x.id == this.primaryLanguage?.id).map(x => this.createCustomVarTansFormArray(x.id))),
      customVarTrans: this.formBuilder.array(this.localizationService.getLanguageList.filter(x => x.id != this.primaryLanguage?.id).map(x => this.createCustomVarTansFormArray(x.id))),
    });
  }

  private createCustomVarTansFormArray(languageId: string) {
    return this.formBuilder.group({
      id!: [{ value: null, disabled: false }],
      customVarId!: [{ value: null, disabled: false }],
      languageId!: [{ value: languageId, disabled: false }, Validators.required],
      name!: [{ value: null, disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
      description!: [{ value: null, disabled: false }],
    })
  }

  get getPrimaryTrans(): AbstractControl[] {
    return (this.formCustomVar.controls['primaryCustomVarTrans'] as FormArray).controls;
  }

  get getOtherLanguagesControl(): AbstractControl[] {
    return (this.formCustomVar.controls['customVarTrans'] as FormArray).controls;
  }

  get getOtherLanguages() {
    return this.localizationService.getLanguageList.filter(x => !x.isPrimary);
  }

  private getCustomVar() {
    this.dataService.getById<CustomVar>(`/CustomVar`, this.languageId).subscribe((response: IApiResponse<CustomVar>) => {
      if (response && response.isSuccess) {
        this.patchFormValue(response.dataSingle);
        //this.formCustomVar.patchValue(response.dataSingle);
      } else {
        if (response.error) {
          let errorMessage;
          for (const key in response.error) {
            if (Object.prototype.hasOwnProperty.call(response.error, key)) {
              if (this.formCustomVar.get(key) != null) {
                this.formCustomVar.get(key)?.setErrors(Validators.required, response.error[key]);
              }
              errorMessage += response.error[key];
            }
          }
          this.messageService.add({ severity: 'error', summary: 'İşlem Başarısız', detail: errorMessage, life: 3000 });
        }
      }
    }, (error: any) => {
      if (isDevMode())
        console.log(error);
    })
  }

  saveCustomVar() {
    if (this.formCustomVar.valid) {
      debugger;
      let item: CustomVar = this.formCustomVar.value;
      const primaryTrans: CustomVarTrans = ((this.formCustomVar.controls['primaryCustomVarTrans'] as FormArray)?.value[0] as CustomVarTrans);
      item.customVarTrans.push(primaryTrans);

      this.dataService.saveData<CustomVar>("/CustomVar", this.formCustomVar.value).pipe(takeUntil(this.unsubscribe)).subscribe((response: IApiResponse<CustomVar>) => {
        if (response && response.isSuccess) {
          this.ref.close(response);
        } else {
          if (response.error) {
            let errorMessage;
            for (const key in response.error) {
              if (Object.prototype.hasOwnProperty.call(response.error, key)) {
                if (this.formCustomVar.get(key) != null) {
                  this.formCustomVar.get(key)?.setErrors(Validators.required, response.error[key]);
                }
                errorMessage += response.error[key];
              }
            }
            this.messageService.add({ severity: 'error', summary: 'İşlem Başarısız', detail: errorMessage, life: 3000 });
          }
          this.messageService.add({ severity: 'error', summary: 'İşlem Başarısız', detail: response.message, life: 3000 });
        }
      }, (error: any) => {
        if (isDevMode())
          console.log(error);
      })
    }
  }

}
