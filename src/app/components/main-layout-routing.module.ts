import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CustomVarComponent } from './custom-var/custom-var.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LanguageComponent } from './language/language.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MenuComponent } from './menu/menu.component';
import { PageComponent } from './page/page.component';
import { SlideComponent } from './slide/slide.component';
import { TranslateComponent } from './translate/translate.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, data: { breadcrumb: 'Dashboard.ControllerTitle' }, children: [
      { path: '', component: DashboardComponent, data: { breadcrumb: 'Dashboard.ControllerTitle' } },
      { path: 'Language', component: LanguageComponent, data: { breadcrumb: 'Language.ControllerTitle' } },
      { path: 'Translate', component: TranslateComponent, data: { breadcrumb: 'Translate.ControllerTitle' } },
      { path: 'CustomVar', component: CustomVarComponent, data: { breadcrumb: 'CustomVar.ControllerTitle' } },
      { path: 'Menu', component: MenuComponent, data: { breadcrumb: 'Menu.ControllerTitle' } },
      { path: 'Category', component: CategoryComponent, data: { breadcrumb: 'Category.ControllerTitle' } },
      { path: 'Page', component: PageComponent, data: { breadcrumb: 'Page.ControllerTitle' } },
      { path: 'Slide', component: SlideComponent, data: { breadcrumb: 'Slide.ControllerTitle' } },]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
