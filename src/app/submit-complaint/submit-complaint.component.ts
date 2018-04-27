import { Component, OnInit } from '@angular/core';
import {StudentService} from '../student.service';
import {LoginService} from '../login.service'
@Component({
  selector: 'app-submit-complaint',
  templateUrl: './submit-complaint.component.html',
  styleUrls: ['./submit-complaint.component.css']
})
export class SubmitComplaintComponent implements OnInit {

  constructor(private studentService:StudentService, private loginService:LoginService) { }
  isLI:boolean =false;

  ngOnInit() {
    this.isLI=this.isLoggedIn();
  }

  submit(location, message,isLI:boolean):void{
    this.studentService.submitComplaint(location,message,isLI);
    
  }

  isLoggedIn():boolean{
    return this.loginService.loggedIn();
  }

}
