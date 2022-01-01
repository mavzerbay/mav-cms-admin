import { Component, isDevMode, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SupportTicket } from 'src/app/models/support-ticket';
import { IApiResponse } from 'src/app/shared/models/api-response';
import { StringFormatPipe } from 'src/app/shared/pipes/string-format.pipe';
import { LocalizationService } from 'src/app/shared/services/localization.service';
import { MavDataService } from 'src/app/shared/services/mav-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  supportTicketList: SupportTicket[] = [];

  private unsubscribe = new Subject();

  constructor(
    private localizationService: LocalizationService,
    private dataService: MavDataService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getSupportTickets();
  }

  translate(keyName: string) {
    return this.localizationService.translate(keyName);
  }

  getSupportTickets() {
    this.dataService.getDataList<SupportTicket>('/SupportTicket').pipe(takeUntil(this.unsubscribe)).subscribe((response: IApiResponse<SupportTicket>) => {
      if (response && response.isSuccess) {
        this.supportTicketList = response.dataMulti;
      }
    }, error => {
      if (isDevMode())
        console.error(error);
    });
  }

  get openSupportTicketText() {
    debugger;
    return new StringFormatPipe().transform(this.translate('SupportTicket.OpenCount'), this.supportTicketList.filter(x => !x.isClosed).length);
  }

  get closeSupportTicketText() {
    return new StringFormatPipe().transform(this.translate('SupportTicket.CloseCount'), this.supportTicketList.filter(x => x.isClosed).length);
  }

  goToSupportTicket() {
    this.router.navigateByUrl('/SupportTicket');
  }
}
