import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/main-layout.module').then(mod => mod.MainLayoutModule), canActivate: [AuthGuard] },
  { path: 'Account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule) },
  { path: 'Error', loadChildren: () => import('./error/error.module').then(mod => mod.ErrorModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
