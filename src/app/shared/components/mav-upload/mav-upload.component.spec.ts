import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MavUploadComponent } from './mav-upload.component';

describe('MavUploadComponent', () => {
  let component: MavUploadComponent;
  let fixture: ComponentFixture<MavUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MavUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MavUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
