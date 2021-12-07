import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideDialogComponent } from './slide-dialog.component';

describe('SlideDialogComponent', () => {
  let component: SlideDialogComponent;
  let fixture: ComponentFixture<SlideDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
