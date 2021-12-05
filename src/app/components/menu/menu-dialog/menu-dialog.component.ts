import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BaseDropdownResponse } from 'src/app/shared/models/base-dropdown-response';
import { MavDataService } from 'src/app/shared/services/mav-data.service';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.scss']
})
export class MenuDialogComponent implements OnInit {

  private unsubscribe = new Subject();

  menuPositionList!: any[];

  constructor(
    private dataService: MavDataService,
  ) { }

  ngOnInit(): void {
  }


  filterMenuPosition(event: any) {
    const query = event && event.query ? event.query : null;
    this.dataService.getDropdownDataList<BaseDropdownResponse>('/CustomVar/GetDropdownList', query).pipe(takeUntil(this.unsubscribe)).subscribe((response) => {
      if (response && response.isSuccess) {
        this.menuPositionList = response.dataMulti;
      } else {
        this.menuPositionList = [];
      }
    })
  }
}
