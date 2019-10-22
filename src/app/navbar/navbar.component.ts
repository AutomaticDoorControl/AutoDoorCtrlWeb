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
  loggedInStudent:boolean = false;
  loggedInAdmin:boolean = false;

  ngOnInit() {
    this.loggedInStudent = this.loginService.loggedIn(); 
    this.loggedInAdmin = this.adminService.loggedIn();
    this.loggedIn = this.loggedInStudent || this.loggedInAdmin;
  }

  logout():void {
    if(this.loggedInAdmin)
      this.adminLogout();
    else if(this.loggedInStudent)
      this.studentLogout();
  }

  studentLogout():void {
    this.loginService.logout();
  }

  adminLogout():void {
    this.adminService.logout();
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
