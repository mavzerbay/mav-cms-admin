import { HttpParams } from '@angular/common/http';
import { Component, isDevMode, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Language } from 'src/app/models/language';
import { Menu, MenuTrans } from 'src/app/models/menu';
import { IApiResponse } from 'src/app/shared/models/api-response';
import { LocalizationService } from 'src/app/shared/services/localization.service';
import { MavDataService } from 'src/app/shared/services/mav-data.service';
import { MavUtilsService } from 'src/app/shared/services/mav-utils.service';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.scss']
})
export class MenuDialogComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private config: DynamicDialogConfig,
    private dataService: MavDataService,
    private messageService: MessageService,
    private ref: DynamicDialogRef,
    private localizationService: LocalizationService,
    private utilsService: MavUtilsService,
  ) { }

  menuId: string = this.config.data;

  formMenu!: FormGroup;

  private unsubscribe = new Subject();

  primaryLanguage = this.localizationService.getPrimaryLanguage;

  language$!: Observable<Language[]>;

  languageList!: Language[];

  menuPositionParams: HttpParams = new HttpParams().append('GroupName', 'MenuPosition');
  menuTypeParams: HttpParams = new HttpParams().append('GroupName', 'MenuType');

  ngOnInit(): void {

    this.language$ = this.localizationService.language$;
    this.language$.subscribe((val) => {
      if (val && val.length > 0) {
        this.languageList = val;
        this.createMenuForm();
        if (this.menuId)
          this.getMenu();
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

  private createMenuForm() {
    this.formMenu = this.formBuilder.group({
      id: [{ value: this.menuId, disabled: false }],
      displayOrder: [{ value: 0, disabled: false }, Validators.required],
      activity: [{ value: true, disabled: false }, Validators.required],
      routerLink: [{ value: null, disabled: false }, Validators.required],
      routerQueryParameter: [{ value: null, disabled: false }],
      icon: [{ value: null, disabled: false }],
      backgroundImagePath: [{ value: null, disabled: false }],
      backgroundImageFile: [{ value: null, disabled: false }],
      isBackend: [{ value: false, disabled: false }, Validators.required],
      menuPosition: [{ value: null, disabled: false }],
      menuPositionId: [{ value: null, disabled: false }],
      parentMenu: [{ value: null, disabled: false }],
      parentMenuId: [{ value: null, disabled: false }],
      page: [{ value: null, disabled: false }],
      pageId: [{ value: null, disabled: false }],
      menuTrans: this.formBuilder.array(this.localizationService.getLanguageList.map(x => this.createMenuTansFormArray(x.id))),
    });

    this.formMenu.get('menuPosition')?.valueChanges.subscribe(val => {
      if (val && val.id)
        this.formMenu.get('menuPositionId')?.setValue(val.id);
      else
        this.formMenu.get('menuPositionId')?.setValue(null);
    });

    this.formMenu.get('parentMenu')?.valueChanges.subscribe(val => {
      if (val && val.id)
        this.formMenu.get('parentMenuId')?.setValue(val.id);
      else
        this.formMenu.get('parentMenuId')?.setValue(null);
    });

    this.formMenu.get('page')?.valueChanges.subscribe(val => {
      if (val && val.id)
        this.formMenu.get('pageId')?.setValue(val.id);
      else
        this.formMenu.get('pageId')?.setValue(null);
    });
  }

  private createMenuTansFormArray(languageId: string) {
    const transForm = this.formBuilder.group({
      id!: [{ value: null, disabled: false }],
      menuId!: [{ value: this.menuId, disabled: false }],
      languageId!: [{ value: languageId, disabled: false }, Validators.required],
      langDisplayOrder: [{ value: null }],
      name!: [{ value: null, disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
      slug!: [{ value: null, disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
      info!: [{ value: null, disabled: false }],
    });

    transForm.get('name')?.valueChanges.subscribe((val: string) => {
      if (val) {
        transForm.get('slug')?.setValue(val.turkishToEnglish().makeUrlFriendly());
      } else {
        transForm.get('slug')?.setValue(null);
      }
    });

    transForm.get('languageId')?.valueChanges.subscribe((val) => {
      transForm.get('langDisplayOrder')?.setValue(this.languageList.find(x => x.id == transForm.get('languageId')?.value)?.displayOrder);
      if (val == this.primaryLanguage?.id) {
        transForm.get('name')?.setValidators(Validators.required);
        transForm.get('name')?.updateValueAndValidity();
      } else {
        transForm.get('name')?.setValidators(null);
        transForm.get('name')?.updateValueAndValidity();
      }
    })
    return transForm;
  }

  get getMenuTransFormArray(): AbstractControl[] {
    return (this.formMenu.controls['menuTrans'] as FormArray).controls.sort((a, b) => a.value.langDisplayOrder > b.value.langDisplayOrder ? 1 : a.value.langDisplayOrder < b.value.langDisplayOrder ? -1 : 0);
  }

  getLanguageName(id: string): string {
    return this.languageList.find(x => x.id == id)?.name!;
  }

  private getMenu() {
    this.dataService.getById<Menu>(`/Menu`, this.menuId).subscribe((response: IApiResponse<Menu>) => {
      if (response && response.isSuccess) {
        this.formMenu.patchValue(response.dataSingle);
      } else {
        if (response.errors) {
          this.utilsService.markFormErrors(this.formMenu, response.errors, this.messageService);
        }
      }
    }, (error: any) => {
      if (isDevMode())
        console.log(error);
    })
  }

  saveMenu() {
    if (this.formMenu.valid) {
      this.dataService.saveData<Menu>("/Menu", this.formMenu.value, null, true).pipe(takeUntil(this.unsubscribe)).subscribe((response: IApiResponse<Menu>) => {
        if (response && response.isSuccess) {
          this.ref.close(response);
        } else {
          debugger;
          if (response.errors) {
            this.utilsService.markFormErrors(this.formMenu, response.errors, this.messageService);
          }
          this.messageService.add({ key: 'menu-toast', severity: 'error', summary: 'İşlem Başarısız', detail: response.message, life: 5000 });
        }
      }, (error: any) => {
        if (isDevMode())
          console.log(error);
      })
    }
  }
}
