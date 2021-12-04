import { Component, HostListener, isDevMode, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LocalizationService } from './shared/services/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private primengConfig: PrimeNGConfig,
    private localizationService: LocalizationService,
  ) {
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.localizationService.getLanguages().subscribe((response) => {
      if (response && response.isSuccess && isDevMode())
        console.log("languages loaded");
    });
    this.localizationService.getTranslations().subscribe((response) => {
      if (response && response.isSuccess && isDevMode())
        console.log("translations loaded");
    });
  }


  @HostListener('click', ['$event'])
  onMouseOut(event: any) {
    const appTopbar = document.getElementsByTagName('app-topbar')[0];
    if (!event.path.some((x: any) => x == appTopbar)) {
      const allTopbarItems = document.querySelectorAll('li[apptopbaritem]');
      allTopbarItems.forEach(element => {
        if (element.classList.contains('active-topmenuitem'))
          element.classList.remove('active-topmenuitem');
      });
    }
  }
}
