import { Component, OnInit } from '@angular/core';
import {Student} from '../student';
import {StudentService} from '../student.service'; 


@Component({
  selector: 'app-request-students',
  templateUrl: './request-students.component.html',
  styleUrls: ['./request-students.component.css']
})
export class RequestStudentsComponent implements OnInit {

  Students: Student[];
  
  /*constructors*/
  constructor(private studentService:StudentService) { }

  /*On load function calls*/
  ngOnInit() {
    this.getStudents();
  }

  /*functions*/
  getStudents():void{
    this.studentService.getRequest()
    .subscribe(List => this.Students = List);
  }

}
