import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUpload } from 'primeng/fileupload';
import { LocalizationService } from '../../services/localization.service';

@Component({
  selector: 'mav-upload',
  templateUrl: './mav-upload.component.html',
  styleUrls: ['./mav-upload.component.scss']
})
export class MavUploadComponent implements OnInit, ControlValueAccessor {

  @ViewChild('upload') fileUpload!: FileUpload;

  @Input() formControlName!: string;
  @Input() formControlNamePath!: string;
  @Input() accept: string = 'image/*';

  defaultPath!: string;

  imagePath!: any;

  constructor(
    private controlContainer: ControlContainer,
    private localizationService: LocalizationService,
    private sanitizer: DomSanitizer,
  ) { }

  translate(keyName: string) {
    return this.localizationService.translate(keyName);
  }

  get inputId() {
    return `${this.controlContainer.name}_${this.formControlName}`;
  }

  get controlFile(): FormControl {
    return <FormControl>this.controlContainer.control?.get(this.formControlName);
  }

  get controlPath(): FormControl {
    return <FormControl>this.controlContainer.control?.get(this.formControlNamePath);
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  ngOnInit(): void {
    this.defaultPath = this.controlPath.value;
    this.imagePath = this.defaultPath;
  }

  selectPhoto(event: any) {
    console.log(event.currentFiles[0]);
    this.controlFile.setValue(event.currentFiles[0]);
    this.imagePath = event.currentFiles[0].objectURL;
  }
  onRemove(event: any) {
    this.fileUpload.clear()
    this.controlFile.setValue(null);
    this.controlPath.setValue(null);
    this.imagePath=null;
    if (this.defaultPath) {
      this.controlPath.setValue(this.defaultPath);
    }
  }
}
