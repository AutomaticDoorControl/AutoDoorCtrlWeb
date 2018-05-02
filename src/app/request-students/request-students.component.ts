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
  
  // constructors needed to use the different services 
  constructor(private admin:AdminService, private studentService:StudentService) { }

  /*On load function calls*/
  ngOnInit() {
    this.getStudents();
  }

  // loads students info into table using student service
  getStudents():void{
    this.studentService.getRequest()
    .subscribe(List => this.Students = List);
  }

  // adds student to the active students list using student service 
  addStudent(username):void{
    this.studentService.addOne(username);
    window.location.reload();
  }

  // adds all students to the active students list using student service 
  addAll():void{
    this.studentService.addAll
  }

  //downloads student list in csv gfile
  downloadCSV():void{
    var blob = new Angular2Csv(this.Students, 'Student Requests');
    var downloadUrl= URL.createObjectURL(blob);
      window.open(downloadUrl);
  }
  
  // allows admin to logout using log out service 
  logout():void{
    this.admin.logout();
  }


}
