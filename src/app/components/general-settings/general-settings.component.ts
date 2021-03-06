import { HttpParams } from '@angular/common/http';
import { Component, isDevMode, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GeneralSettings } from 'src/app/models/general-settings';
import { Language } from 'src/app/models/language';
import { IApiResponse } from 'src/app/shared/models/api-response';
import { LocalizationService } from 'src/app/shared/services/localization.service';
import { MavDataService } from 'src/app/shared/services/mav-data.service';
import { MavUtilsService } from 'src/app/shared/services/mav-utils.service';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss'],
  providers: [
    MessageService,
  ]
})
export class GeneralSettingsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private dataService: MavDataService,
    private messageService: MessageService,
    private localizationService: LocalizationService,
    private utilsService: MavUtilsService,
  ) { }

  formGeneralSettings!: FormGroup;

  private unsubscribe = new Subject();

  primaryLanguage = this.localizationService.getPrimaryLanguage;

  language$!: Observable<Language[]>;

  languageList!: Language[];

  pageCustomParams: HttpParams = new HttpParams().append("OnlyParent", true);

  ngOnInit(): void {
    this.language$ = this.localizationService.language$;
    this.language$.subscribe((val) => {
      if (val && val.length > 0) {
        this.languageList = val;
        this.createGeneralSettingsForm();
        this.getGeneralSettings();
      }
    });
  }

  private createGeneralSettingsForm() {
    this.formGeneralSettings = this.formBuilder.group({
      id: [{ value: null, disabled: false }],
      supportMail: [{ value: null, disabled: false }],
      contactAddress: [{ value: null, disabled: false }],
      contactPhone: [{ value: null, disabled: false }],
      contactWhatsApp: [{ value: null, disabled: false }],
      googleMapUrl: [{ value: null, disabled: false }],
      linkedInURL: [{ value: null, disabled: false }],
      facebookURL: [{ value: null, disabled: false }],
      instagramURL: [{ value: null, disabled: false }],
      yearsOfExperienced!: [{ value: 0, disabled: false }],
      projectDone!: [{ value: 0, disabled: false }],
      happyCustomer!: [{ value: 0, disabled: false }],
      testimonialSlideId: [{ value: null, disabled: false }],
      testimonialSlide: [{ value: null, disabled: false }],
      latestProjectPageId: [{ value: null, disabled: false }],
      latestProjectPage: [{ value: null, disabled: false }],
      generalSettingsTrans: this.formBuilder.array(this.localizationService.getLanguageList.map(x => this.createGeneralSettingsTransFormArray(x.id))),
    });

    this.formGeneralSettings.get('testimonialSlide')?.valueChanges.subscribe((val) => {
      if (val && val.id) {
        this.formGeneralSettings.get('testimonialSlideId')?.setValue(val.id);
      } else {
        this.formGeneralSettings.get('testimonialSlideId')?.setValue(null);
      }
    });

    this.formGeneralSettings.get('latestProjectPage')?.valueChanges.subscribe((val) => {
      if (val && val.id) {
        this.formGeneralSettings.get('latestProjectPageId')?.setValue(val.id);
      } else {
        this.formGeneralSettings.get('latestProjectPageId')?.setValue(null);
      }
    });
  }

  private createGeneralSettingsTransFormArray(languageId: string) {
    const transForm = this.formBuilder.group({
      id!: [{ value: null, disabled: false }],
      generalSettingsId!: [{ value: null, disabled: false }],
      languageId!: [{ value: languageId, disabled: false }, Validators.required],
      langDisplayOrder: [{ value: null }],
      logoPath!: [{ value: null, disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
      logoFile!: [{ value: null, disabled: false }],
      aboutUs!: [{ value: null, disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
      info1Icon!: [{ value: 'pi-cog', disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
      info1Title!: [{ value: null, disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
      info1Description!: [{ value: null, disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
      info2Icon!: [{ value: 'pi-thumbs-up', disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
      info2Title!: [{ value: null, disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
      info2Description!: [{ value: null, disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
      info3Icon!: [{ value: 'pi-money-bill', disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
      info3Title!: [{ value: null, disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
      info3Description!: [{ value: null, disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
      info4Icon!: [{ value: 'pi-eject', disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
      info4Title!: [{ value: null, disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
      info4Description!: [{ value: null, disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
      icoPath!: [{ value: null, disabled: false }],
      icoFile!: [{ value: null, disabled: false }],
      homeOgTitle!: [{ value: null, disabled: false }],
      homeOgDescription!: [{ value: null, disabled: false }],
      homeOgKeywordModel!: [{ value: null, disabled: false }],
      homeOgKeywords!: [{ value: null, disabled: false }],
      homeOgImage!: [{ value: null, disabled: false }],
      homeOgFile!: [{ value: null, disabled: false }],
      contactOgTitle!: [{ value: null, disabled: false }],
      contactOgDescription!: [{ value: null, disabled: false }],
      contactOgKeywordModel!: [{ value: null, disabled: false }],
      contactOgKeywords!: [{ value: null, disabled: false }],
      contactOgImage!: [{ value: null, disabled: false }],
      contactOgFile!: [{ value: null, disabled: false }],
    });


    transForm.get('homeOgKeywordModel')?.valueChanges.subscribe((val: string[]) => {
      if (val && val.length > 0) {
        transForm.get('homeOgKeywords')?.setValue(val.join(','));
      } else {
        transForm.get('homeOgKeywords')?.setValue(null);
      }
    });
    transForm.get('contactOgKeywordModel')?.valueChanges.subscribe((val: string[]) => {
      if (val && val.length > 0) {
        transForm.get('contactOgKeywords')?.setValue(val.join(','));
      } else {
        transForm.get('contactOgKeywords')?.setValue(null);
      }
    });

    transForm.get('languageId')?.valueChanges.subscribe((val) => {
      transForm.get('langDisplayOrder')?.setValue(this.languageList.find(x => x.id == transForm.get('languageId')?.value)?.displayOrder);
    });

    return transForm;
  }

  get getGeneralSettingsTransFormArray(): AbstractControl[] {
    return (this.formGeneralSettings.controls['generalSettingsTrans'] as FormArray).controls.sort((a, b) => a.value.langDisplayOrder > b.value.langDisplayOrder ? 1 : a.value.langDisplayOrder < b.value.langDisplayOrder ? -1 : 0);
  }

  getLanguageName(id: string): string {
    return this.languageList.find(x => x.id == id)?.name!;
  }
  translate(keyName: string) {
    return this.localizationService.translate(keyName);
  }

  private getGeneralSettings() {
    this.dataService.getData<GeneralSettings>(`/GeneralSettings`,).subscribe((response: IApiResponse<GeneralSettings>) => {
      if (response && response.isSuccess) {
        for (let i = 0; i < response.dataSingle.generalSettingsTrans.length; i++) {
          const element = response.dataSingle.generalSettingsTrans[i];
          if (element.homeOgKeywords) {
            if (element.homeOgKeywords.includes(','))
              element.homeOgKeywordModel = element.homeOgKeywords.split(',');
            else
              element.homeOgKeywordModel = [element.homeOgKeywords];
          }
          if (element.contactOgKeywords) {
            if (element.contactOgKeywords.includes(','))
              element.contactOgKeywordModel = element.contactOgKeywords.split(',');
            else
              element.contactOgKeywordModel = [element.contactOgKeywords];
          }
        }
        this.formGeneralSettings.patchValue(response.dataSingle);
      } else {
        if (response.errors) {
          this.utilsService.markFormErrors(this.formGeneralSettings, response.errors, this.messageService);
        }
      }
    }, error => {
      if (isDevMode())
        console.log(error);
    })
  }

  saveGeneralSettings() {
    if (this.formGeneralSettings.valid) {
      this.dataService.saveData<GeneralSettings>("/GeneralSettings", this.formGeneralSettings.value, null, true, true).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
        if (response && response.isSuccess) {
          this.messageService.add({ key: 'general-settings-toast', severity: 'success', summary: '????lem Ba??ar??l??', detail: response.message, life: 3000 });
          this.formGeneralSettings.patchValue(response.dataSingle);
        } else {
          if (response.errors) {
            this.utilsService.markFormErrors(this.formGeneralSettings, response.errors, this.messageService);
          }
          this.messageService.add({ key: 'general-settings-toast', severity: 'error', summary: '????lem Ba??ar??s??z', detail: response.message, life: 3000 });
        }
      }, error => {
        if (isDevMode())
          console.log(error);
      })
    }
  }

}

