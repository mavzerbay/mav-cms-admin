import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MavAutocompleteComponent } from './mav-autocomplete.component';

describe('MavAutocompleteComponent', () => {
  let component: MavAutocompleteComponent;
  let fixture: ComponentFixture<MavAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MavAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MavAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
