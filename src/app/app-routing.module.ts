import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomVarComponent } from './components/custom-var/custom-var.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LanguageComponent } from './components/language/language.component';
import { TranslateComponent } from './components/translate/translate.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, data: { breadcrumb: 'Anasayfa' } },
  { path: 'Language', component: LanguageComponent, data: { breadcrumb: 'Dil' } },
  { path: 'Translate', component: TranslateComponent, data: { breadcrumb: 'Çeviri' } },
  { path: 'CustomVar', component: CustomVarComponent, data: { breadcrumb: 'Özel Değişken' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
