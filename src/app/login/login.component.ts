//contains code for the login page and the functions used in the login html
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../login.service';
import {StudentService} from '../student.service';
import {AdminService} from '../admin.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // constructors needed to use the different services 
  constructor( private loginService:LoginService, private studentService:StudentService, private adminService:AdminService, private router:Router) { }

  /*On load function calls*/
  
  ngOnInit() {
  }

  // allows students to login via login service
  Studentlogin(username, password):void{
    this.loginService.login(username, password);
  }

  // allows admin to login using admin service
  Adminlogin(username,password):void{
    this.adminService.login(username,password);
  }

  //allows students to register via student service
  Studentregister(username):void{
    this.studentService.register(username);
  }

}
