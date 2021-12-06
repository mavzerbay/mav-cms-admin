import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { LocalizationService } from '../../services/localization.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @ViewChild('sidebar', { static: true }) sidebar: ElementRef<HTMLElement> | undefined;

  constructor(
    private renderer: Renderer2,
    private localizationService: LocalizationService
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
