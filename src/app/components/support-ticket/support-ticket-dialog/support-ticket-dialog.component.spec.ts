import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportTicketDialogComponent } from './support-ticket-dialog.component';

describe('SupportTicketDialogComponent', () => {
  let component: SupportTicketDialogComponent;
  let fixture: ComponentFixture<SupportTicketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportTicketDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportTicketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
