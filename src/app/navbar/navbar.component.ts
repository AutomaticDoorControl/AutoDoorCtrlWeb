import { Component, OnInit } from '@angular/core';

import { LoginService } from '../login.service';
import { AdminService } from '../admin.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService, private adminService: AdminService, private studentService: StudentService) { }

  loggedIn:boolean = false;

  ngOnInit() {
    this.loggedIn = this.loginService.loggedIn(); 
  }

  studentLogout():void {
    this.loginService.logout();
  }

  // allows students to login via login service
  studentLogin(username):void{
    this.loginService.login(username);
  }

  // allows admin to login using admin service
  adminLogin(username,password):void{
    this.adminService.login(username,password);
  }

  //allows students to register via student service
  studentRegister(username):void{
    this.studentService.register(username);
  }


}
