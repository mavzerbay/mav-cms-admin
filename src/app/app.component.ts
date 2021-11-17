import { Component, HostListener, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private primengConfig: PrimeNGConfig,
  ) {
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
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
