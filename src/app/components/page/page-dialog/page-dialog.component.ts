import { HttpParams } from '@angular/common/http';
import { Component, isDevMode, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Language } from 'src/app/models/language';
import { Page } from 'src/app/models/page';
import { IApiResponse } from 'src/app/shared/models/api-response';
import { LocalizationService } from 'src/app/shared/services/localization.service';
import { MavDataService } from 'src/app/shared/services/mav-data.service';

@Component({
  selector: 'app-page-dialog',
  templateUrl: './page-dialog.component.html',
  styleUrls: ['./page-dialog.component.scss']
})
export class PageDialogComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private config: DynamicDialogConfig,
    private dataService: MavDataService,
    private messageService: MessageService,
    private ref: DynamicDialogRef,
    private localizationService: LocalizationService,
  ) { }

  pageId: string = this.config.data;

  formPage!: FormGroup;

  private unsubscribe = new Subject();

  primaryLanguage = this.localizationService.getPrimaryLanguage;

  language$!: Observable<Language[]>;

  languageList!: Language[];

  pagePositionParams: HttpParams = new HttpParams().append('GroupName', 'PagePosition');
  pageTypeParams: HttpParams = new HttpParams().append('GroupName', 'PageType');

  ngOnInit(): void {

    this.language$ = this.localizationService.language$;
    this.language$.subscribe((val) => {
      if (val && val.length > 0) {
        this.languageList = val;
        this.createPageForm();
        if (this.pageId)
          this.getPage();
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

  private createPageForm() {
    this.formPage = this.formBuilder.group({
      id: [{ value: this.pageId, disabled: false }],
      activity: [{ value: true, disabled: false }, Validators.required],
      parentPage: [{ value: null, disabled: false }],
      parentPageId: [{ value: null, disabled: false }],
      category: [{ value: null, disabled: false }],
      categoryId: [{ value: null, disabled: false }],
      pageTrans: this.formBuilder.array(this.localizationService.getLanguageList.map(x => this.createPageTansFormArray(x.id))),
    });
    this.formPage.get('category')?.valueChanges.subscribe(val => {
      if (val && val.id)
        this.formPage.get('categoryId')?.setValue(val.id);
      else
        this.formPage.get('categoryId')?.setValue(null);
    });
    this.formPage.get('parentPage')?.valueChanges.subscribe(val => {
      if (val && val.id)
        this.formPage.get('parentPageId')?.setValue(val.id);
      else
        this.formPage.get('parentPageId')?.setValue(null);
    });
  }

  private createPageTansFormArray(languageId: string) {
    const transForm = this.formBuilder.group({
      id!: [{ value: null, disabled: false }],
      pageId!: [{ value: this.pageId, disabled: false }],
      languageId!: [{ value: languageId, disabled: false }, Validators.required],
      langDisplayOrder: [{ value: null }],
      name!: [{ value: null, disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
      summary!: [{ value: null, disabled: false }],
      content!: [{ value: null, disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
      headerPath: [{ value: null, disabled: false }],
      headerFile: [{ value: null, disabled: false }],
      backgroundPath: [{ value: null, disabled: false }],
      backgroundFile: [{ value: null, disabled: false }],
      ogTitle: [{ value: null, disabled: false }],
      ogDescription: [{ value: null, disabled: false }],
      ogImagePath: [{ value: null, disabled: false }],
      ogImageFile: [{ value: null, disabled: false }],
      ogType: [{ value: null, disabled: false }],
    });

    transForm.get('languageId')?.valueChanges.subscribe((val) => {
      transForm.get('langDisplayOrder')?.setValue(this.languageList.find(x => x.id == transForm.get('languageId')?.value)?.displayOrder);
      if (val == this.primaryLanguage?.id) {
        transForm.get('name')?.setValidators(Validators.required);
        transForm.get('name')?.updateValueAndValidity();
        transForm.get('content')?.setValidators(Validators.required);
        transForm.get('content')?.updateValueAndValidity();
      }else{        
        transForm.get('name')?.setValidators(null);
        transForm.get('name')?.updateValueAndValidity();
        transForm.get('content')?.setValidators(null);
        transForm.get('content')?.updateValueAndValidity();
      }
    })
    return transForm;
  }

  get getPageTransFormArray(): AbstractControl[] {
    return (this.formPage.controls['pageTrans'] as FormArray).controls.sort((a, b) => a.value.langDisplayOrder > b.value.langDisplayOrder ? 1 : a.value.langDisplayOrder < b.value.langDisplayOrder ? -1 : 0);
  }

  getLanguageName(id: string): string {
    return this.languageList.find(x => x.id == id)?.name!;
  }

  private getPage() {
    this.dataService.getById<Page>(`/Page`, this.pageId).subscribe((response: IApiResponse<Page>) => {
      if (response && response.isSuccess) {
        this.formPage.patchValue(response.dataSingle);
      } else {
        if (response.error) {
          let errorMessage;
          for (const key in response.error) {
            if (Object.prototype.hasOwnProperty.call(response.error, key)) {
              if (this.formPage.get(key) != null) {
                this.formPage.get(key)?.setErrors(Validators.required, response.error[key]);
              }
              errorMessage += response.error[key];
            }
          }
          this.messageService.add({ key: 'page-toast', severity: 'error', summary: 'İşlem Başarısız', detail: errorMessage, life: 5000 });
        }
      }
    }, (error: any) => {
      if (isDevMode())
        console.log(error);
    })
  }

  savePage() {
    if (this.formPage.valid) {
      this.dataService.saveData<Page>("/Page", this.formPage.value, null, true).pipe(takeUntil(this.unsubscribe)).subscribe((response: IApiResponse<Page>) => {
        if (response && response.isSuccess) {
          this.ref.close(response);
        } else {
          if (response.error) {
            let errorMessage;
            for (const key in response.error) {
              if (Object.prototype.hasOwnProperty.call(response.error, key)) {
                if (this.formPage.get(key) != null) {
                  this.formPage.get(key)?.setErrors(Validators.required, response.error[key]);
                }
                errorMessage += response.error[key];
              }
            }
            this.messageService.add({ key: 'page-toast', severity: 'error', summary: 'İşlem Başarısız', detail: errorMessage, life: 5000 });
          }
          this.messageService.add({ key: 'page-toast', severity: 'error', summary: 'İşlem Başarısız', detail: response.message, life: 5000 });
        }
      }, (error: any) => {
        if (isDevMode())
          console.log(error);
      })
    }
  }
  openTypes(){
    window.open('https://ogp.me/#types','_blank')?.focus();
  }
}
