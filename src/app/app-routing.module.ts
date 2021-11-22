import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LanguageComponent } from './components/language/language.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, data: { breadcrumb: 'Anasayfa' } },
  { path: 'Language', component: LanguageComponent, data: { breadcrumb: 'Dil' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
