import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { LocalizationService } from '../../services/localization.service';
import { MavAuthService } from '../../services/mav-auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(
    private authService: MavAuthService,
    private localizationService:LocalizationService
  ) { }


  ngOnInit(): void {

  }

  translate(keyName:string){
    return this.localizationService.translate(keyName);
  }

  logout() {
    this.authService.logout().subscribe();
  }

  toggleSideBarActive() {
    const layoutWrapper = document.getElementsByClassName('layout-menu-light')[0];
    if (layoutWrapper) {
      if (window.innerWidth <= 991 && layoutWrapper.classList.contains('layout-topbar-mobile-active')) {
        layoutWrapper.classList.remove('layout-topbar-mobile-active');
      }
      if (window.innerWidth <= 991 && layoutWrapper.classList.contains('layout-sidebar-mobile-active')) {
        layoutWrapper.classList.remove('layout-sidebar-mobile-active');
        layoutWrapper.classList.remove('layout-wrapper-static');
      }
      else {
        if (window.innerWidth <= 991) {
          layoutWrapper.classList.add('layout-sidebar-mobile-active');
          layoutWrapper.classList.add('layout-wrapper-static');
        }
      }
    }
  }

  toggleTopBarActive() {
    const layoutWrapper = document.getElementsByClassName('layout-menu-light')[0];
    if (layoutWrapper) {
      if (window.innerWidth <= 991 && layoutWrapper.classList.contains('layout-sidebar-mobile-active')) {
        layoutWrapper.classList.remove('layout-sidebar-mobile-active');
        layoutWrapper.classList.remove('layout-wrapper-static');
      }
      if (window.innerWidth <= 991 && layoutWrapper.classList.contains('layout-topbar-mobile-active')) {
        layoutWrapper.classList.remove('layout-topbar-mobile-active');
      }
      else {
        if (window.innerWidth <= 991) {
          layoutWrapper.classList.add('layout-topbar-mobile-active');
        }
      }
    }
  }

}
