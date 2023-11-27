import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, LocationStrategy } from '@angular/common';
import { Location, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { HeaderComponent } from './header/header.component';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';

import { StartComponent } from './start/start.component'; /*dashboard de artemisa*/
import { RegisterComponent } from './register/register.component';
import { UsertableComponent } from './usertable/usertable.component';
import { LoginadminComponent } from './loginadmin/loginadmin.component';
import { AdmincontrolComponent } from './admincontrol/admincontrol.component';
import { RegisterinvestigatorComponent } from './registerinvestigator/registerinvestigator.component';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditorModule } from 'primeng/editor';
import { PasswordModule } from 'primeng/password';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';


/*
const routes: Routes = [
  {path : 'start', component: AppComponent },
  {path : 'register', component: RegisterComponent },
  {path : '', redirectTo: '/start', pathMatch:'full' }
  {path : 'login', component: LoginComponent },
];
*/


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    StartComponent,
    HeaderComponent,
    UsertableComponent,
    LoginadminComponent,
    AdmincontrolComponent,
    RegisterinvestigatorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    FormsModule,
    KeyFilterModule,
    SelectButtonModule,
    InputTextareaModule,
    EditorModule,
    ReactiveFormsModule,
    PasswordModule,
    CarouselModule,
    CardModule,
    CommonModule,
    RouterModule.forRoot(Approutes, { useHash: true }),
    NgbModule,
    HttpClientModule,
    DropdownModule,
    DialogModule,
    FileUploadModule,
    ToastModule,
    MultiSelectModule,
    TableModule,
    ToolbarModule,
    TagModule,
    ConfirmDialogModule,
    InputNumberModule
    /*
        RouterModule.forRoot(routes),
    */

    /*
    RouterModule.forRoot(appRoutes)
    */

  ],
  providers: [
    Location, { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
