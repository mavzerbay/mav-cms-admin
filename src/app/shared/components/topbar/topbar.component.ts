import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/app-user';
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
    private localizationService: LocalizationService
  ) { }

  currentUser$!: Observable<AppUser | null>;

  ngOnInit(): void {
    this.currentUser$ = this.authService.currentUser$;
  }

  get getRole() {
    this.currentUser$.subscribe((user) => {
      if (user != null && user.userRoles && user.userRoles.length > 0)
        return user.userRoles[0].name;
    })
    return null;
  }

  translate(keyName: string) {
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
