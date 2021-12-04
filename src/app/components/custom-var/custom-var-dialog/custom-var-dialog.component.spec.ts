import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomVarDialogComponent } from './custom-var-dialog.component';

describe('CustomVarDialogComponent', () => {
  let component: CustomVarDialogComponent;
  let fixture: ComponentFixture<CustomVarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomVarDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomVarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
