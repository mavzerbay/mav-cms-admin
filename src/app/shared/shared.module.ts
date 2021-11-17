import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { TopbarItemDirective } from './components/topbar/topbar-item.directive';

@NgModule({
  declarations: [
    MenuComponent,
    TopbarComponent,
    TopbarItemDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MenuComponent,
    TopbarComponent,
  ]
})
export class SharedModule { }
