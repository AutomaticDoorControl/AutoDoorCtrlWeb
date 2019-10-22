import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentService } from '../student.service';
import { LoginService } from '../login.service'

@Component({
  selector: 'app-submit-complaint',
  templateUrl: './submit-complaint.component.html',
  styleUrls: ['./submit-complaint.component.css']
})
export class SubmitComplaintComponent implements OnInit {
  // constructors needed to use the different services 
  constructor(private studentService:StudentService, private loginService:LoginService, public router:Router) { }
  
  // if the student is logged in whil submiting a complaint, the back button leads back to the service button
  // if the student is not logged in while submiting a complaint, the back button leads back to the login page 
  isLI:boolean =false;

  /*On load function calls*/  
  ngOnInit() {
    this.isLI=this.isLoggedIn();
  }

  //submits the complaint to the db using student service
  submit(location, message,isLI:boolean):void{
    this.studentService.submitComplaint(location,message,isLI);
    
  }
  // checks if student is logged in (buttons in navbar are different for logged in users)
  isLoggedIn():boolean{
    return this.loginService.loggedIn();
  }

}
