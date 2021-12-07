import { AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUpload } from 'primeng/fileupload';
import { LocalizationService } from '../../services/localization.service';

@Component({
  selector: 'mav-upload',
  templateUrl: './mav-upload.component.html',
  styleUrls: ['./mav-upload.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => MavUploadComponent)
  }]
})
export class MavUploadComponent implements AfterViewInit, ControlValueAccessor {

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

  ngAfterViewInit(): void {
    this.controlPath.valueChanges.subscribe((val)=>{
      if(val){
        this.defaultPath = this.controlPath.value;
        this.imagePath = this.defaultPath;
      }
    })
  }

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

  selectPhoto(event: any) {
    console.log(event.currentFiles[0]);
    this.controlFile.setValue(event.currentFiles[0]);
    this.imagePath = event.currentFiles[0].objectURL;
  }
  onRemove(event: any) {
    this.fileUpload.clear()
    this.controlFile.setValue(null);
    this.controlPath.setValue(null);
    this.imagePath = null;
    if (this.defaultPath) {
      this.controlPath.setValue(this.defaultPath);
    }
  }
}
