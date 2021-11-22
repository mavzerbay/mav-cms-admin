import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MavInputComponent } from './mav-input.component';

describe('MavInputComponent', () => {
  let component: MavInputComponent;
  let fixture: ComponentFixture<MavInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MavInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MavInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
