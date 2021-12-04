import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'main-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @ViewChild('sidebar', { static: true }) sidebar: ElementRef<HTMLElement> | undefined;

  constructor(
    private renderer: Renderer2,
  ) { }

  isLocked: boolean = false;

  ngOnInit(): void {
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
