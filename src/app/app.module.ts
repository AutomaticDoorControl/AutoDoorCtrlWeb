import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { AppRoutingModule }     from './app-routing.module';
import {HttpClientModule} from '@angular/common/http'


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ButtonComponent } from './button/button.component';
import { ActiveStudentsComponent } from './active-students/active-students.component';
import { RequestStudentsComponent } from './request-students/request-students.component';
import { StudentService } from './student.service';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { LoginService } from './login.service';
import { AdminService } from './admin.service';
import { SubmitComplaintComponent } from './submit-complaint/submit-complaint.component';
import { ListComplaintsComponent } from './list-complaints/list-complaints.component';
import { LandingPageComponent } from './landing-page/landing-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ButtonComponent,
    ActiveStudentsComponent,
    RequestStudentsComponent,
    MessagesComponent,
    SubmitComplaintComponent,
    ListComplaintsComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [StudentService, MessageService, LoginService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
