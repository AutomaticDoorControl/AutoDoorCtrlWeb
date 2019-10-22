import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {StudentService} from '../student.service'; 
import {AdminService} from '../admin.service';

import { convertArrayToCSV } from 'convert-array-to-csv';

@Component({
  selector: 'app-request-students',
  templateUrl: './request-students.component.html',
  styleUrls: ['./request-students.component.css']
})
export class RequestStudentsComponent implements OnInit {

  Students: any[];
  
  // constructors needed to use the different services 
  constructor(private admin:AdminService, private studentService:StudentService, private router:Router) { }

  /*On load function calls*/
  ngOnInit() {
    this.getStudents();
  }

  // loads students info into table using student service
  getStudents():void{
    this.studentService.getRequest()
    .subscribe(
      List => this.Students = List,
      err => {localStorage.removeItem("admin"); this.router.navigate(['login']);}
    );
  }

  // adds student to the active students list using student service 
  addStudent(username):void{
    this.studentService.addOne(username);
  }

  // adds all students to the active students list using student service 
  addAll():void{
    this.studentService.addAll();
  }

  //downloads student list in csv gfile
  downloadCSV():void{
    let csv = convertArrayToCSV(this.Students);
    let blob = new Blob([csv], {type: 'text/csv;charset=utf8;'});
    let uri = 'data:attachment/csv;charset=utf-8,' + encodeURI(csv);
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('visibility', 'hidden');
    link.download = 'Requests.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  // allows admin to logout using log out service 
  logout():void{
    this.admin.logout();
  }


}
