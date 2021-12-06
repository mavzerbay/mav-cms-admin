import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomVarComponent } from './components/custom-var/custom-var.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LanguageComponent } from './components/language/language.component';
import { MenuComponent } from './components/menu/menu.component';
import { TranslateComponent } from './components/translate/translate.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, data: { breadcrumb: 'Anasayfa' } },
  { path: 'Language', component: LanguageComponent, data: { breadcrumb: 'Language.ControllerTitle' } },
  { path: 'Translate', component: TranslateComponent, data: { breadcrumb: 'Translate.ControllerTitle' } },
  { path: 'CustomVar', component: CustomVarComponent, data: { breadcrumb: 'CustomVar.ControllerTitle' } },
  { path: 'Menu', component: MenuComponent, data: { breadcrumb: 'Menu.ControllerTitle' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
