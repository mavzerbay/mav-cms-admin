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

@NgModule({
  declarations: [
    AppComponent,
    LanguageComponent,
    DashboardComponent,
    LanguageDialogComponent,
    TranslateComponent,
    TranslateDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
