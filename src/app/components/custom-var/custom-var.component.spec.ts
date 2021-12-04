import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomVarComponent } from './custom-var.component';

describe('CustomVarComponent', () => {
  let component: CustomVarComponent;
  let fixture: ComponentFixture<CustomVarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomVarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomVarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
