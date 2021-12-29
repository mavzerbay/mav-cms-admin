import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CustomVarComponent } from './custom-var/custom-var.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { LanguageComponent } from './language/language.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MenuComponent } from './menu/menu.component';
import { PageComponent } from './page/page.component';
import { SlideComponent } from './slide/slide.component';
import { TranslateComponent } from './translate/translate.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, data: { breadcrumb: 'Dashboard.ControllerTitle' }, children: [
      { path: '', component: DashboardComponent, data: { breadcrumb: 'Dashboard.ControllerTitlePlural' } },
      { path: 'Language', component: LanguageComponent, data: { breadcrumb: 'Language.ControllerTitlePlural' } },
      { path: 'Translate', component: TranslateComponent, data: { breadcrumb: 'Translate.ControllerTitlePlural' } },
      { path: 'CustomVar', component: CustomVarComponent, data: { breadcrumb: 'CustomVar.ControllerTitlePlural' } },
      { path: 'Menu', component: MenuComponent, data: { breadcrumb: 'Menu.ControllerTitlePlural' } },
      { path: 'Category', component: CategoryComponent, data: { breadcrumb: 'Category.ControllerTitlePlural' } },
      { path: 'Page', component: PageComponent, data: { breadcrumb: 'Page.ControllerTitlePlural' } },
      { path: 'Slide', component: SlideComponent, data: { breadcrumb: 'Slide.ControllerTitlePlural' } },
      { path: 'GeneralSettings', component: GeneralSettingsComponent, data: { breadcrumb: 'GeneralSettings.ControllerTitle' } },
      { path: 'User', component: UserComponent, data: { breadcrumb: 'AppUser.ControllerTitlePlural' } },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
