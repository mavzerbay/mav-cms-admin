import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideMediaDialogComponent } from './slide-media-dialog.component';

describe('SlideMediaDialogComponent', () => {
  let component: SlideMediaDialogComponent;
  let fixture: ComponentFixture<SlideMediaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideMediaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideMediaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
