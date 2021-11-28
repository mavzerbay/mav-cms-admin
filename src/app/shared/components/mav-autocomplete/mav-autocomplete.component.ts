import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { BaseDropdownResponse } from '../../models/base-dropdown-response';
import { MavDataService } from '../../services/mav-data.service';

@Component({
  selector: 'mav-autocomplete',
  templateUrl: './mav-autocomplete.component.html',
  styleUrls: ['./mav-autocomplete.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => MavAutocompleteComponent)
  }]
})
export class MavAutocompleteComponent implements ControlValueAccessor {

  @Input() formControlName!: string;
  @Input() withoutForm: boolean = false;
  @Input() label!: string;
  @Input() field: string = 'name';
  @Input() dataKey: string = 'id';
  @Input() suggestionUrl!: string;
  @Input() style!: string;
  @Input() class!: string;
  /**
   * Specifies the behavior dropdown button. Default "blank" mode sends an empty string and "current" mode sends the input value.
   */
  @Input() dropdownMode: string = 'blank';

  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  suggestions!: any[];

  selectedItem!: any;

  constructor(
    private controlContainer: ControlContainer,
    private dataService: MavDataService,
  ) { }

  private unsubscribe = new Subject();

  get inputId() {
    return `${this.controlContainer.name}_${this.formControlName}`;
  }

  get control(): FormControl {
    return <FormControl>this.controlContainer.control?.get(this.formControlName);
  }

  writeValue(value: any): void {
    this.control?.setValue(value);
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  ngOnInit(): void {
  }

  filterData(event: any) {
    const query = event && event.query ? event.query : null;
    this.dataService.getDropdownDataList<BaseDropdownResponse>(this.suggestionUrl, query).pipe(takeUntil(this.unsubscribe)).subscribe((response) => {
      if (response && response.isSuccess) {
        this.suggestions = response.dataMulti;
      }
    })
  }
  onSelectItem(event: any) {
    this.onSelect.emit(event);
  }
}
