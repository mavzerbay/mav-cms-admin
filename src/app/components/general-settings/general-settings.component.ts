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
      generalSettingsTrans: this.formBuilder.array(this.localizationService.getLanguageList.map(x => this.createGeneralSettingsTransFormArray(x.id))),
    });

    this.formGeneralSettings.get('testimonialSlide')?.valueChanges.subscribe((val) => {
      if (val && val.id) {
        this.formGeneralSettings.get('testimonialSlideId')?.setValue(val.id);
      } else {
        this.formGeneralSettings.get('testimonialSlideId')?.setValue(null);
      }
    })
  }
  private createGeneralSettingsTransFormArray(languageId: string) {
    const transForm = this.formBuilder.group({
      id!: [{ value: null, disabled: false }],
      generalSettingsId!: [{ value: null, disabled: false }],
      languageId!: [{ value: languageId, disabled: false }, Validators.required],
      langDisplayOrder: [{ value: null }],
      logoPath!: [{ value: null, disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
      logoFile!: [{ value: null, disabled: false }, languageId == this.primaryLanguage?.id ? Validators.required : null],
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
      homeOgImage!: [{ value: null, disabled: false }],
      homeOgFile!: [{ value: null, disabled: false }],
      contactOgTitle!: [{ value: null, disabled: false }],
      contactOgDescription!: [{ value: null, disabled: false }],
      contactOgImage!: [{ value: null, disabled: false }],
      contactOgFile!: [{ value: null, disabled: false }],
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
          this.formGeneralSettings.patchValue(response.dataSingle);
        } else {
          if (response.errors) {
            this.utilsService.markFormErrors(this.formGeneralSettings, response.errors, this.messageService);
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

