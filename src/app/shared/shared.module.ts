import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { TopbarItemDirective } from './components/topbar/topbar-item.directive';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { CrudLayoutComponent } from './components/crud-layout/crud-layout.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';


@NgModule({
  declarations: [
    MenuComponent,
    TopbarComponent,
    TopbarItemDirective,
    BreadcrumbComponent,
    FooterComponent,
    CrudLayoutComponent,
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
    DropdownModule,
    ProgressBarModule,
    DialogModule,
    ConfirmDialogModule,
    MessagesModule,
    DynamicDialogModule
  ],
  exports: [
    MenuComponent,
    TopbarComponent,
    BreadcrumbComponent,
    FooterComponent,
    CrudLayoutComponent,
  ]
})
export class SharedModule { }
