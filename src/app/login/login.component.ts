import { Component, OnInit } from '@angular/core';


import { LoginService } from '../login.service';
import {StudentService} from '../student.service'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private loginService:LoginService, private studentService:StudentService) { }

  ngOnInit() {
  }

  Studentlogin(username):void{
    this.loginService.login(username);
  }
  //todo, implement admin route gaurds and stuff
  //Adminlogin(username):void{}

  Studentregister(username):void{
    this.studentService.register(username);
    window.location.reload();
  }

}
