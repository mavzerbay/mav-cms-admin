import { HttpParams } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, isDevMode, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Language } from 'src/app/models/language';
import { Slide, SlideMedia } from 'src/app/models/slide';
import { IApiResponse } from 'src/app/shared/models/api-response';
import { LocalizationService } from 'src/app/shared/services/localization.service';
import { MavDataService } from 'src/app/shared/services/mav-data.service';

@Component({
  selector: 'app-slide-dialog',
  templateUrl: './slide-dialog.component.html',
  styleUrls: ['./slide-dialog.component.scss']
})
export class SlideDialogComponent implements OnInit, AfterViewInit {

  constructor(
    private formBuilder: FormBuilder,
    private config: DynamicDialogConfig,
    private dataService: MavDataService,
    private messageService: MessageService,
    private ref: DynamicDialogRef,
    private localizationService: LocalizationService,
    private cdRef: ChangeDetectorRef,
  ) { }
  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  slideId: string = this.config.data;

  formSlide!: FormGroup;

  private unsubscribe = new Subject();

  primaryLanguage = this.localizationService.getPrimaryLanguage;

  language$!: Observable<Language[]>;

  languageList!: Language[];

  slidePositionParams: HttpParams = new HttpParams().append('GroupName', 'SlidePosition');

  ngOnInit(): void {
    this.language$ = this.localizationService.language$;
    this.language$.subscribe((val) => {
      if (val && val.length > 0) {
        this.languageList = val;
        this.createSlideForm();
        if (this.slideId)
          this.getSlide();
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

  private createSlideForm() {
    this.formSlide = this.formBuilder.group({
      id: [{ value: this.slideId, disabled: false }],
      activity: [{ value: true, disabled: false }, Validators.required],
      isHome: [{ value: false, disabled: false }, Validators.required],
      page: [{ value: null, disabled: false }],
      pageId: [{ value: null, disabled: false }],
      slidePosition: [{ value: null, disabled: false }, Validators.required],
      slidePositionId: [{ value: null, disabled: false }, Validators.required],
      slideMedias: this.formBuilder.array([]),
    });
    this.formSlide.get('page')?.valueChanges.subscribe(val => {
      if (val && val.id)
        this.formSlide.get('pageId')?.setValue(val.id);
      else
        this.formSlide.get('pageId')?.setValue(null);
    });
    this.formSlide.get('slidePosition')?.valueChanges.subscribe(val => {
      if (val && val.id)
        this.formSlide.get('slidePositionId')?.setValue(val.id);
      else
        this.formSlide.get('slidePositionId')?.setValue(null);
    });
  }

  createSlideMedia(media?: SlideMedia) {
    const mediaForm = this.formBuilder.group({
      id!: [{ value: null, disabled: false }],
      slideId: [{ value: this.slideId, disabled: false }],
      language: [{ value: this.languageList.find(x => x.id == media?.languageId), disabled: false }, Validators.required],
      languageId: [{ value: null, disabled: false }, Validators.required],
      activity: [{ value: true, disabled: false }, Validators.required],
      displayOrder: [{ value: 0, disabled: false }, Validators.required],
      textStyle: [{ value: null, disabled: false }],
      buttonStyle: [{ value: null, disabled: false }],
      buttonText: [{ value: null, disabled: false }],
      linkPage: [{ value: null, disabled: false }],
      linkPageId: [{ value: null, disabled: false }],
      backgroundImagePath: [{ value: null, disabled: false }],
      backgroundImageFile: [{ value: null, disabled: false }, media && media.backgroundImagePath ? null : Validators.required],
      routerLink: [{ value: null, disabled: false }],
      routerQueryParameters: [{ value: null, disabled: false }],
      title: [{ value: null, disabled: false }, Validators.required],
      summary: [{ value: null, disabled: false }],
    });

    mediaForm.get('linkPage')?.valueChanges.subscribe(val => {
      if (val && val.id)
        mediaForm.get('linkPageId')?.setValue(val.id);
      else
        mediaForm.get('linkPageId')?.setValue(null);
    });

    mediaForm.get('language')?.valueChanges.subscribe(val => {
      if (val && val.id)
        mediaForm.get('languageId')?.setValue(val.id);
      else
        mediaForm.get('languageId')?.setValue(null);
    });

    if (media && media.id)
      mediaForm.patchValue(media);

    return mediaForm;
  }

  addSlideMedia() {
    (this.formSlide.get('slideMedias') as FormArray).push(this.createSlideMedia());
  }

  patchFormValues(slide: Slide) {
    this.formSlide.patchValue(slide);
    if (slide.slideMedias && slide.slideMedias.length > 0) {
      for (let i = 0; i < slide.slideMedias.length; i++) {
        (this.formSlide.get('slideMedias') as FormArray).push(this.createSlideMedia(slide.slideMedias[i]));

      }
    }
  }

  get getSlideTransFormArray(): AbstractControl[] {
    return (this.formSlide.controls['slideTrans'] as FormArray).controls.sort((a, b) => a.value.langDisplayOrder > b.value.langDisplayOrder ? 1 : a.value.langDisplayOrder < b.value.langDisplayOrder ? -1 : 0);
  }

  getLanguageName(id: string): string {
    return this.languageList.find(x => x.id == id)?.name!;
  }

  private getSlide() {
    this.dataService.getById<Slide>(`/Slide`, this.slideId).subscribe((response: IApiResponse<Slide>) => {
      if (response && response.isSuccess) {
        this.patchFormValues(response.dataSingle);
      } else {
        if (response.error) {
          let errorMessage;
          for (const key in response.error) {
            if (Object.prototype.hasOwnProperty.call(response.error, key)) {
              if (this.formSlide.get(key) != null) {
                this.formSlide.get(key)?.setErrors(Validators.required, response.error[key]);
              }
              errorMessage += response.error[key];
            }
          }
          this.messageService.add({ key: 'slide-toast', severity: 'error', summary: 'İşlem Başarısız', detail: errorMessage, life: 5000 });
        }
      }
    }, (error: any) => {
      if (isDevMode())
        console.log(error);
    })
  }

  saveSlide() {
    if (this.formSlide.valid) {
      this.dataService.saveData<Slide>("/Slide", this.formSlide.value, null, true).pipe(takeUntil(this.unsubscribe)).subscribe((response: IApiResponse<Slide>) => {
        if (response && response.isSuccess) {
          this.ref.close(response);
        } else {
          if (response.error) {
            let errorMessage;
            for (const key in response.error) {
              if (Object.prototype.hasOwnProperty.call(response.error, key)) {
                if (this.formSlide.get(key) != null) {
                  this.formSlide.get(key)?.setErrors(Validators.required, response.error[key]);
                }
                errorMessage += response.error[key];
              }
            }
            this.messageService.add({ key: 'slide-toast', severity: 'error', summary: 'İşlem Başarısız', detail: errorMessage, life: 5000 });
          }
          this.messageService.add({ key: 'slide-toast', severity: 'error', summary: 'İşlem Başarısız', detail: response.message, life: 5000 });
        }
      }, (error: any) => {
        if (isDevMode())
          console.log(error);
      })
    }
  }
}
