import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideMediaComponent } from './slide-media.component';

describe('SlideMediaComponent', () => {
  let component: SlideMediaComponent;
  let fixture: ComponentFixture<SlideMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
