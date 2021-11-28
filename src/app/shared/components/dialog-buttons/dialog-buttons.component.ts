import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  onCancelClick() {
    this.onCancel.emit();
  }
  onSaveClick() {
    this.onSave.emit();
  }

}
