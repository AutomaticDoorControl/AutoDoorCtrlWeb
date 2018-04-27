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
  
  /*constructors*/
  constructor(private admin:AdminService, private studentService:StudentService) { }

  /*On load function calls*/
  ngOnInit() {
    this.getStudents();
  }

  /*functions*/
  getStudents():void{
    this.studentService.getActive()
    .subscribe(List => this.Students = List);
  }

  removeOne(username):void{
    this.studentService.remove(username);
  }

  logout():void{
    this.admin.logout();
  }



}
