import { Component, OnInit } from '@angular/core';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import {StudentService} from '../student.service'; 
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-request-students',
  templateUrl: './request-students.component.html',
  styleUrls: ['./request-students.component.css']
})
export class RequestStudentsComponent implements OnInit {

  Students: any[];
  
  /*constructors*/
  constructor(private admin:AdminService, private studentService:StudentService) { }

  /*On load function calls*/
  ngOnInit() {
    this.getStudents();
  }

  /*functions*/
  getStudents():void{
    this.studentService.getRequest()
    .subscribe(List => this.Students = List);
  }

  addStudent(username):void{
    this.studentService.addOne(username);
    window.location.reload();
  }

  addAll():void{
    this.studentService.addAll
  }

  downloadCSV():void{
    var blob = new Angular2Csv(this.Students, 'Student Requests');
    var downloadUrl= URL.createObjectURL(blob);
      window.open(downloadUrl);
  }

  logout():void{
    this.admin.logout();
  }


}
