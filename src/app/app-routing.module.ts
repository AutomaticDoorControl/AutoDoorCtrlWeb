import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import{LoginComponent} from './login/login.component';
import{ButtonComponent} from './button/button.component';
import{ActiveStudentsComponent} from './active-students/active-students.component';
import{RequestStudentsComponent} from './request-students/request-students.component';




const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'button', component: ButtonComponent},
  { path: 'active-students', component: ActiveStudentsComponent},
  { path: 'request-students', component: RequestStudentsComponent}
];


@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}