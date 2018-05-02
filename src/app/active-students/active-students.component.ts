import { Component, OnInit } from '@angular/core';

import {StudentService} from '../student.service'; 
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-active-students',
  templateUrl: './active-students.component.html',
  styleUrls: ['./active-students.component.css']
})
export class ActiveStudentsComponent implements OnInit {
  /*variables*/
  Students: any[];
  
  // constructors needed to use the different services
  constructor(private admin:AdminService, private studentService:StudentService) { }

  /*On load function calls*/
  ngOnInit() {
    this.getStudents();
  }

  //loads students into table using student service
  getStudents():void{
    this.studentService.getActive()
    .subscribe(List => this.Students = List);
  }

  //removes a student from the active list using student service
  removeOne(username):void{
    this.studentService.remove(username);
  }

  // logs the admin out using admin service
  logout():void{
    this.admin.logout();
  }



}
