import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'mav-input',
  templateUrl: './mav-input.component.html',
  styleUrls: ['./mav-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => MavInputComponent)
  }]
})
export class MavInputComponent implements ControlValueAccessor {

  //common
  @Input() formControlName!: string;
  /**
   * text,textarea,numeric,autocomplete
   */
  @Input() type: string = "text";
  @Input() placeHolder!: string;
  @Input() label!: string;
  @Input() icon!: string;
  /**
   * left,right
   */
  @Input() iconPosition: string = 'left';
  @Input() style!: string;
  @Input() class!: string;
  @Input() disabled: boolean = false;
  @Input() autocomplete: string = 'off';

  //textarea
  @Input() rows: number = 4;
  @Input() cols: number = 30;

  //numeric
  /**
   * could be currency
   */
  @Input() mode: string = "decimal";
  @Input() min: number = 0;
  @Input() max!: number;

  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() onBlur: EventEmitter<void> = new EventEmitter();
  @Output() onKeyDown: EventEmitter<any> = new EventEmitter();
  @Output() onKeyUp: EventEmitter<any> = new EventEmitter();


  constructor(
    private controlContainer: ControlContainer,
  ) { }

  get inputId() {
    return `${this.controlContainer.name}_${this.formControlName}`;
  }

  get control(): FormControl {
    return <FormControl>this.controlContainer.control?.get(this.formControlName);
  }

  writeValue(value: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  onInput(value: any) {
    this.onChange.emit(value);
  }

  blur() {
    this.onBlur.emit();
  }

  keydown(event: any) {
    this.onKeyDown.emit(event);

  }

  keyup(event: any) {
    this.onKeyUp.emit(event);
  }

  change(event: any) {
    this.onChange.emit(event.checked);
  }

}
