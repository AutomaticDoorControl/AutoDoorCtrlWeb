import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import{LoginComponent} from './login/login.component';
import{LoginService} from './login.service';
import{ButtonComponent} from './button/button.component';
import{ActiveStudentsComponent} from './active-students/active-students.component';
import{RequestStudentsComponent} from './request-students/request-students.component';




const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'button', component: ButtonComponent,canActivate:[LoginService]},
  { path: 'active-students', component: ActiveStudentsComponent},
  { path: 'request-students', component: RequestStudentsComponent},
  { path: '**', redirectTo: 'login'}
];


@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}