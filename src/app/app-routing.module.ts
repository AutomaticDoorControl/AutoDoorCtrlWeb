import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';
import { ButtonComponent } from './button/button.component';
import { ActiveStudentsComponent } from './active-students/active-students.component';
import { RequestStudentsComponent } from './request-students/request-students.component';
import { ListComplaintsComponent } from './list-complaints/list-complaints.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SubmitComplaintComponent } from './submit-complaint/submit-complaint.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'button', component: ButtonComponent,canActivate:[LoginService]},
  { path: 'active-students', component: ActiveStudentsComponent,canActivate:[LoginService]},
  { path: 'request-students', component: RequestStudentsComponent,canActivate:[LoginService]},
  { path: 'list-complaints', component:ListComplaintsComponent,canActivate:[LoginService]},
  { path: 'reset-password', component:ResetPasswordComponent,canActivate:[LoginService]},
  { path: 'submit-complaint', component:SubmitComplaintComponent},
  { path: '**', redirectTo: 'login'}	
];


@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: [{provide: APP_BASE_HREF, useValue : '/' }]
  })
  export class AppRoutingModule {}
