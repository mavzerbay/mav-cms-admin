import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LanguageComponent } from './components/language/language.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LanguageDialogComponent } from './components/language/language-dialog/language-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateComponent } from './components/translate/translate.component';
import { TranslateDialogComponent } from './components/translate/translate-dialog/translate-dialog.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuDialogComponent } from './components/menu/menu-dialog/menu-dialog.component';
import { CustomVarComponent } from './components/custom-var/custom-var.component';
import { CustomVarDialogComponent } from './components/custom-var/custom-var-dialog/custom-var-dialog.component';
import { PageComponent } from './components/page/page.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryDialogComponent } from './components/category/category-dialog/category-dialog.component';
import { PageDialogComponent } from './components/page/page-dialog/page-dialog.component';
import { TooltipModule } from 'primeng/tooltip';
import { EditorModule } from 'primeng/editor';
import { SlideComponent } from './components/slide/slide.component';
import { SlideDialogComponent } from './components/slide/slide-dialog/slide-dialog.component';
import { SlideMediaComponent } from './components/slide/slide-media/slide-media.component';
import { SlideMediaDialogComponent } from './components/slide/slide-media-dialog/slide-media-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
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
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TooltipModule,
    EditorModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
