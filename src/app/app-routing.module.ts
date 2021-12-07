import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { CustomVarComponent } from './components/custom-var/custom-var.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LanguageComponent } from './components/language/language.component';
import { MenuComponent } from './components/menu/menu.component';
import { PageComponent } from './components/page/page.component';
import { SlideComponent } from './components/slide/slide.component';
import { TranslateComponent } from './components/translate/translate.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, data: { breadcrumb: 'Anasayfa' } },
  { path: 'Language', component: LanguageComponent, data: { breadcrumb: 'Language.ControllerTitle' } },
  { path: 'Translate', component: TranslateComponent, data: { breadcrumb: 'Translate.ControllerTitle' } },
  { path: 'CustomVar', component: CustomVarComponent, data: { breadcrumb: 'CustomVar.ControllerTitle' } },
  { path: 'Menu', component: MenuComponent, data: { breadcrumb: 'Menu.ControllerTitle' } },
  { path: 'Category', component: CategoryComponent, data: { breadcrumb: 'Category.ControllerTitle' } },
  { path: 'Page', component: PageComponent, data: { breadcrumb: 'Page.ControllerTitle' } },
  { path: 'Slide', component: SlideComponent, data: { breadcrumb: 'Slide.ControllerTitle' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
