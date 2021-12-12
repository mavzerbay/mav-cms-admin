import { Component, ElementRef, isDevMode, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IApiResponse } from '../../models/api-response';
import { LocalizationService } from '../../services/localization.service';
import { MavDataService } from '../../services/mav-data.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @ViewChild('sidebar', { static: true }) sidebar: ElementRef<HTMLElement> | undefined;

  constructor(
    private renderer: Renderer2,
    private localizationService: LocalizationService,
    private dataService: MavDataService,
  ) { }

  isLocked: boolean = false;

  menuList!: any[];

  private unsubscribe = new Subject()

  ngOnInit(): void {
    this.getMenuList();
  }

  getMenuList() {
    this.dataService.getDataList<any>('/Menu/AdminMenus').pipe(takeUntil(this.unsubscribe)).subscribe((response: IApiResponse<any>) => {
      if (response && response.isSuccess) {
        this.menuList = response.dataMulti;
      }
    }, error => {
      if (isDevMode())
        console.error(error);
    });
  }

  toggleActive() {
    if (this.sidebar && this.sidebar.nativeElement && !this.isLocked) {
      if (this.sidebar.nativeElement.classList.contains('layout-sidebar-active'))
        this.sidebar.nativeElement.classList.remove('layout-sidebar-active');
      else {
        this.sidebar.nativeElement.classList.add('layout-sidebar-active');
      }
    }
  }

  translate(keyName: string) {
    return this.localizationService.translate(keyName);
  }

  toggleLockActiveMenu() {
    this.isLocked = !this.isLocked;

    const layoutWrapper = document.getElementsByClassName('layout-menu-light')[0];

    if (this.isLocked) {
      if (!this.sidebar?.nativeElement.classList.contains('layout-sidebar-active'))
        this.sidebar?.nativeElement.classList.add('layout-sidebar-active');

      this.renderer.addClass(layoutWrapper, 'layout-wrapper-static');
    } else {
      this.renderer.removeClass(layoutWrapper, 'layout-wrapper-static');
    }
  }

}
