import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LanguageComponent } from './language/language.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LanguageDialogComponent } from './language/language-dialog/language-dialog.component';
import { TranslateComponent } from './translate/translate.component';
import { TranslateDialogComponent } from './translate/translate-dialog/translate-dialog.component';
import { MenuComponent } from './menu/menu.component';
import { MenuDialogComponent } from './menu/menu-dialog/menu-dialog.component';
import { CustomVarComponent } from './custom-var/custom-var.component';
import { CustomVarDialogComponent } from './custom-var/custom-var-dialog/custom-var-dialog.component';
import { PageComponent } from './page/page.component';
import { CategoryComponent } from './category/category.component';
import { CategoryDialogComponent } from './category/category-dialog/category-dialog.component';
import { PageDialogComponent } from './page/page-dialog/page-dialog.component';
import { SlideComponent } from './slide/slide.component';
import { SlideDialogComponent } from './slide/slide-dialog/slide-dialog.component';
import { SlideMediaComponent } from './slide/slide-media/slide-media.component';
import { SlideMediaDialogComponent } from './slide/slide-media-dialog/slide-media-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MainLayoutComponent,
    LanguageComponent,
    DashboardComponent,
    LanguageDialogComponent,
    TranslateComponent,
    TranslateDialogComponent,
    MenuComponent,
    MenuDialogComponent,
    CustomVarComponent,
    CustomVarDialogComponent,
    PageComponent,
    CategoryComponent,
    CategoryDialogComponent,
    PageDialogComponent,
    SlideComponent,
    SlideDialogComponent,
    SlideMediaComponent,
    SlideMediaDialogComponent,
  ],
  imports: [
    MainLayoutRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    EditorModule,
  ]
})
export class MainLayoutModule { }
