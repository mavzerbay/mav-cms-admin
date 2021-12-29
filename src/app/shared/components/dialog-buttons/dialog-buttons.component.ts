import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalizationService } from '../../services/localization.service';

@Component({
  selector: 'dialog-buttons',
  templateUrl: './dialog-buttons.component.html',
  styleUrls: ['./dialog-buttons.component.scss']
})
export class DialogButtonsComponent implements OnInit {

  @Output() onSave: EventEmitter<void> = new EventEmitter();
  @Output() onCancel: EventEmitter<void> = new EventEmitter();

  @Input() saveDisabled: boolean = false;
  @Input() cancelDisabled: boolean = false;

  @Input() showCancelButton: boolean = true;


  constructor(
    private localizationService: LocalizationService,
  ) { }

  translate(keyName: string) {
    return this.localizationService.translate(keyName);
  }

  ngOnInit(): void {
  }

  onCancelClick() {
    this.onCancel.emit();
  }
  onSaveClick() {
    this.onSave.emit();
  }

}
