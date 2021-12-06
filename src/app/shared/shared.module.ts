import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { TopbarItemDirective } from './components/topbar/topbar-item.directive';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { CrudLayoutComponent } from './components/crud-layout/crud-layout.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogButtonsComponent } from './components/dialog-buttons/dialog-buttons.component';
import { MavAutocompleteComponent } from './components/mav-autocomplete/mav-autocomplete.component';
import { MavUploadComponent } from './components/mav-upload/mav-upload.component';

//Primeng
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProgressBarModule } from 'primeng/progressbar';
import { MavInputComponent } from './components/mav-input/mav-input.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { CheckboxModule } from 'primeng/checkbox';
import { MavDataFromKeyDirective } from './directives/mav-data-from-key.directive';
import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { ActivityPipe } from './pipes/activity.pipe';


@NgModule({
  declarations: [
    SideMenuComponent,
    TopbarComponent,
    TopbarItemDirective,
    BreadcrumbComponent,
    FooterComponent,
    CrudLayoutComponent,
    MavInputComponent,
    DialogButtonsComponent,
    MavAutocompleteComponent,
    MavDataFromKeyDirective,
    MavUploadComponent,
    YesNoPipe,
    ActivityPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    //Primeng Modules
    TableModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    AutoCompleteModule,
    ProgressBarModule,
    DialogModule,
    InputSwitchModule,
    ConfirmDialogModule,
    MessagesModule,
    DynamicDialogModule,
    BreadcrumbModule,
    TriStateCheckboxModule,
    CheckboxModule,
    FileUploadModule,
  ],
  exports: [
    SideMenuComponent,
    TopbarComponent,
    BreadcrumbComponent,
    FooterComponent,
    CrudLayoutComponent,
    MavInputComponent,
    DialogButtonsComponent,
    MavAutocompleteComponent,
    MavUploadComponent,
    TabViewModule,
    ToastModule,
  ]
})
export class SharedModule { }
