import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {

  }

  toggleActive() {
    const layoutWrapper = document.getElementsByClassName('layout-menu-light')[0];
    if (layoutWrapper) {
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

}
