import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import{LoginComponent} from './login/login.component';
import{LoginService} from './login.service';
import{ButtonComponent} from './button/button.component';
import{ActiveStudentsComponent} from './active-students/active-students.component';
import{RequestStudentsComponent} from './request-students/request-students.component';
import{ListComplaintsComponent} from './list-complaints/list-complaints.component';
import{SubmitComplaintComponent} from './submit-complaint/submit-complaint.component';
import{AdminService} from './admin.service';




const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'button', component: ButtonComponent,canActivate:[LoginService]},
  { path: 'active-students', component: ActiveStudentsComponent,canActivate:[AdminService]},
  { path: 'request-students', component: RequestStudentsComponent,canActivate:[AdminService]},
  { path: 'list-complaints', component:ListComplaintsComponent,canActivate:[AdminService]},
  { path: 'submit-complaint', component:SubmitComplaintComponent},
  { path: '**', redirectTo: 'login'}
];


@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}