import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocalizationService } from 'src/app/shared/services/localization.service';
import { MavDataService } from 'src/app/shared/services/mav-data.service';

@Component({
  selector: 'app-slide-media-dialog',
  templateUrl: './slide-media-dialog.component.html',
  styleUrls: ['./slide-media-dialog.component.scss']
})
export class SlideMediaDialogComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private config: DynamicDialogConfig,
    private messageService: MessageService,
    private ref: DynamicDialogRef,
    private localizationService: LocalizationService,
    private controlContainer: ControlContainer,
  ) { }

  slideMediaIndex = this.config.data;

  formSlideMedia!: FormGroup;

  closeDialog() {
    if (this.slideMediaIndex == -1)
      this.ref.close();
    else
      this.ref.close(this.formSlideMedia.value);
  }

  translate(keyName: string) {
    return this.localizationService.translate(keyName);
  }

  ngOnInit(): void {
    if (this.slideMediaIndex == -1)
      this.formSlideMedia = <FormGroup>this.slideMediaArray.at(this.slideMediaArray.length - 1);
    else
      this.formSlideMedia = <FormGroup>this.slideMediaArray.at(this.slideMediaIndex);
  }

  get slideMediaArray() {
    return <FormArray>this.controlContainer.control?.get('slideMedias');
  }

  saveSlideMedia() {
    if (this.formSlideMedia.valid) {
      if (this.formSlideMedia.value.backgroundImageFile)
        this.formSlideMedia.value.backgroundImagePath = this.formSlideMedia.value.backgroundImageFile.objectURL;
      this.ref.close(this.formSlideMedia.value);
    }
  }

}
