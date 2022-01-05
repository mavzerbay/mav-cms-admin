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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { UserComponent } from './user/user.component';
import { UserDialogComponent } from './user/user-dialog/user-dialog.component';
import { SupportTicketComponent } from './support-ticket/support-ticket.component';
import { SupportTicketDialogComponent } from './support-ticket/support-ticket-dialog/support-ticket-dialog.component';

//Primeng
import { EditorModule } from 'primeng/editor';
import { TooltipModule } from 'primeng/tooltip';
import { ChipsModule } from 'primeng/chips';
import { AccordionModule } from 'primeng/accordion';

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
    GeneralSettingsComponent,
    UserComponent,
    UserDialogComponent,
    SupportTicketComponent,
    SupportTicketDialogComponent,
  ],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    EditorModule,
    AccordionModule,
    ChipsModule,
  ]
})
export class MainLayoutModule { }
