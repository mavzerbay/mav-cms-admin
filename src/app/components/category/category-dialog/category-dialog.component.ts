import { Component, isDevMode, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Category, CategoryTrans } from 'src/app/models/category';
import { Language } from 'src/app/models/language';
import { IApiResponse } from 'src/app/shared/models/api-response';
import { LocalizationService } from 'src/app/shared/services/localization.service';
import { MavDataService } from 'src/app/shared/services/mav-data.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private config: DynamicDialogConfig,
    private dataService: MavDataService,
    private messageService: MessageService,
    private ref: DynamicDialogRef,
    private localizationService: LocalizationService,
  ) { }

  categoryId: string = this.config.data;

  formCategory!: FormGroup;

  private unsubscribe = new Subject();

  primaryLanguage = this.localizationService.getPrimaryLanguage;

  language$!: Observable<Language[]>;

  languageList!: Language[];

  ngOnInit(): void {
    this.language$ = this.localizationService.language$;
    this.language$.subscribe((val) => {
      if (val && val.length > 0) {
        this.languageList = val;
        this.createCategoryForm();
        if (this.categoryId)
          this.getCategory();
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

  private patchFormValue(data: Category) {
    const primaryTrans = data.categoryTrans.find(x => x.languageId == this.primaryLanguage?.id);
    data.categoryTrans = data.categoryTrans.filter(x => x.languageId != this.primaryLanguage?.id);

    this.formCategory.patchValue(data);
    this.formCategory.patchValue({ categoryTrans: data.categoryTrans });
    this.formCategory.patchValue({ primaryCategoryTrans: [primaryTrans] });
  }

  private createCategoryForm() {
    this.formCategory = this.formBuilder.group({
      id: [{ value: this.categoryId, disabled: false }],
      activity: [{ value: true, disabled: false }, Validators.required],
      primaryCategoryTrans: this.formBuilder.array(this.localizationService.getLanguageList.filter(x => x.id == this.primaryLanguage?.id).map(x => this.createCategoryTansFormArray(x.id))),
      categoryTrans: this.formBuilder.array(this.localizationService.getLanguageListWithoutPrimary.map(x => this.createCategoryTansFormArray(x.id))),
    });
  }

  private createCategoryTansFormArray(languageId: string) {
    const transForm = this.formBuilder.group({
      id!: [{ value: null, disabled: false }],
      categoryId!: [{ value: this.categoryId, disabled: false }],
      languageId!: [{ value: languageId, disabled: false }, Validators.required],
      langDisplayOrder: [{ value: null }],
      name!: [{ value: null, disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
      info!: [{ value: null, disabled: false }],
    });

    transForm.get('languageId')?.valueChanges.subscribe((val) => {
      transForm.get('langDisplayOrder')?.setValue(this.languageList.find(x => x.id == transForm.get('languageId')?.value)?.displayOrder);
    })

    return transForm;
  }

  get getPrimaryTrans(): AbstractControl[] {
    return (this.formCategory.controls['primaryCategoryTrans'] as FormArray).controls;
  }

  get getCategoryTransFormArray(): AbstractControl[] {
    return (this.formCategory.controls['categoryTrans'] as FormArray).controls.sort((a, b) => a.value.langDisplayOrder > b.value.langDisplayOrder ? 1 : a.value.langDisplayOrder < b.value.langDisplayOrder ? -1 : 0);
  }

  getLanguageName(id: string): string {
    return this.languageList.find(x => x.id == id)?.name!;
  }

  private getCategory() {
    this.dataService.getById<Category>(`/Category`, this.categoryId).subscribe((response: IApiResponse<Category>) => {
      if (response && response.isSuccess) {
        this.patchFormValue(response.dataSingle);
        //this.formCategory.patchValue(response.dataSingle);
      } else {
        if (response.error) {
          let errorMessage;
          for (const key in response.error) {
            if (Object.prototype.hasOwnProperty.call(response.error, key)) {
              if (this.formCategory.get(key) != null) {
                this.formCategory.get(key)?.setErrors(Validators.required, response.error[key]);
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

  saveCategory() {
    if (this.formCategory.valid) {
      let item: Category = this.formCategory.value;
      const primaryTrans: CategoryTrans = ((this.formCategory.controls['primaryCategoryTrans'] as FormArray)?.value[0] as CategoryTrans);
      item.categoryTrans.push(primaryTrans);

      this.dataService.saveData<Category>("/Category", this.formCategory.value).pipe(takeUntil(this.unsubscribe)).subscribe((response: IApiResponse<Category>) => {
        if (response && response.isSuccess) {
          this.ref.close(response);
        } else {
          if (response.error) {
            let errorMessage;
            for (const key in response.error) {
              if (Object.prototype.hasOwnProperty.call(response.error, key)) {
                if (this.formCategory.get(key) != null) {
                  this.formCategory.get(key)?.setErrors(Validators.required, response.error[key]);
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
