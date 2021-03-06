import { AfterViewInit, ChangeDetectorRef, Component, isDevMode, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CustomVar, CustomVarTrans } from 'src/app/models/custom-var';
import { Language } from 'src/app/models/language';
import { IApiResponse } from 'src/app/shared/models/api-response';
import { LocalizationService } from 'src/app/shared/services/localization.service';
import { MavDataService } from 'src/app/shared/services/mav-data.service';
import { MavUtilsService } from 'src/app/shared/services/mav-utils.service';

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
    private utilsService: MavUtilsService,
  ) { }

  customVarId: string = this.config.data;

  formCustomVar!: FormGroup;

  private unsubscribe = new Subject();

  primaryLanguage = this.localizationService.getPrimaryLanguage;

  language$!: Observable<Language[]>;

  languageList!: Language[];

  ngOnInit(): void {
    this.language$ = this.localizationService.language$;
    this.language$.subscribe((val) => {
      if (val && val.length > 0) {
        this.languageList = val;
        this.createCustomVarForm();
        if (this.customVarId)
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
    this.formCustomVar.patchValue({ customVarTrans: data.customVarTrans });
    this.formCustomVar.patchValue({ primaryCustomVarTrans: [primaryTrans] });
  }

  private createCustomVarForm() {
    this.formCustomVar = this.formBuilder.group({
      id: [{ value: this.customVarId, disabled: false }],
      groupName: [{ value: null, disabled: false }, Validators.required],
      keyName: [{ value: null, disabled: false }, Validators.required],
      value: [{ value: null, disabled: false }],
      primaryCustomVarTrans: this.formBuilder.array(this.localizationService.getLanguageList.filter(x => x.id == this.primaryLanguage?.id).map(x => this.createCustomVarTansFormArray(x.id))),
      customVarTrans: this.formBuilder.array(this.localizationService.getLanguageListWithoutPrimary.map(x => this.createCustomVarTansFormArray(x.id))),
    });
  }

  private createCustomVarTansFormArray(languageId: string) {
    const transForm = this.formBuilder.group({
      id!: [{ value: null, disabled: false }],
      customVarId!: [{ value: this.customVarId, disabled: false }],
      languageId!: [{ value: languageId, disabled: false }, Validators.required],
      langDisplayOrder: [{ value: null }],
      name!: [{ value: null, disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
      description!: [{ value: null, disabled: false }],
    });

    transForm.get('languageId')?.valueChanges.subscribe((val) => {
      transForm.get('langDisplayOrder')?.setValue(this.languageList.find(x => x.id == transForm.get('languageId')?.value)?.displayOrder);
    })

    return transForm;
  }

  get getPrimaryTrans(): AbstractControl[] {
    return (this.formCustomVar.controls['primaryCustomVarTrans'] as FormArray).controls;
  }

  get getCustomVarTransFormArray(): AbstractControl[] {
    return (this.formCustomVar.controls['customVarTrans'] as FormArray).controls.sort((a, b) => a.value.langDisplayOrder > b.value.langDisplayOrder ? 1 : a.value.langDisplayOrder < b.value.langDisplayOrder ? -1 : 0);
  }

  getLanguageName(id: string): string {
    return this.languageList.find(x => x.id == id)?.name!;
  }

  private getCustomVar() {
    this.dataService.getById<CustomVar>(`/CustomVar`, this.customVarId).subscribe((response: IApiResponse<CustomVar>) => {
      if (response && response.isSuccess) {
        this.patchFormValue(response.dataSingle);
        //this.formCustomVar.patchValue(response.dataSingle);
      } else {
        if (response.errors) {
          this.utilsService.markFormErrors(this.formCustomVar, response.errors, this.messageService);
        }
      }
    }, (error: any) => {
      if (isDevMode())
        console.log(error);
    })
  }

  saveCustomVar() {
    if (this.formCustomVar.valid) {
      let item: CustomVar = this.formCustomVar.value;
      const primaryTrans: CustomVarTrans = ((this.formCustomVar.controls['primaryCustomVarTrans'] as FormArray)?.value[0] as CustomVarTrans);
      item.customVarTrans.push(primaryTrans);

      this.dataService.saveData<CustomVar>("/CustomVar", this.formCustomVar.value).pipe(takeUntil(this.unsubscribe)).subscribe((response: IApiResponse<CustomVar>) => {
        if (response && response.isSuccess) {
          this.ref.close(response);
        } else {
          if (response.errors) {
            this.utilsService.markFormErrors(this.formCustomVar, response.errors, this.messageService);
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
