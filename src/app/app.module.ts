import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { AppRoutingModule }     from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ActiveStudentsComponent } from './active-students/active-students.component';
import { RequestStudentsComponent } from './request-students/request-students.component';
import { StudentService } from './student.service';
import { LoginService } from './login.service';
import { AdminService } from './admin.service';
import { SubmitComplaintComponent } from './submit-complaint/submit-complaint.component';
import { ListComplaintsComponent } from './list-complaints/list-complaints.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthInterceptorService } from './authinterceptor.service';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ActiveStudentsComponent,
    RequestStudentsComponent,
    SubmitComplaintComponent,
    ListComplaintsComponent,
    NavbarComponent,
    AdminSidebarComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StudentService,
    LoginService,
    AdminService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
