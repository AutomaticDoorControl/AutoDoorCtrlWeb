import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { AppRoutingModule }     from './app-routing.module';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ButtonComponent } from './button/button.component';
import { ActiveStudentsComponent } from './active-students/active-students.component';
import { RequestStudentsComponent } from './request-students/request-students.component';
import { StudentService } from './student.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ButtonComponent,
    ActiveStudentsComponent,
    RequestStudentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
