import { Component, OnInit } from '@angular/core';
import {StudentService} from '../student.service';
import {AdminService} from '../admin.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';


@Component({
  selector: 'app-list-complaints',
  templateUrl: './list-complaints.component.html',
  styleUrls: ['./list-complaints.component.css']
})
export class ListComplaintsComponent implements OnInit {

  // constructors needed to use the different services 
  constructor(private admin:AdminService, private studentService:StudentService) { }

  Complaints:any[];

  /*On load function calls*/  
  ngOnInit() {
    this.getComplaints();
  }

  //loads complaints onto page using student service
  getComplaints():void{
    this.studentService.listComplaints().subscribe(
      data =>{
        this.Complaints = data;
        console.log("listed all complaints");
      },
      err =>{
      console.log("err: issue with server");
      })
  }

  //download list of complaints to csv
  downloadCSV():void{
    var blob = new Angular2Csv(this.Complaints, 'Student Requests');
    var downloadUrl= URL.createObjectURL(blob);
      window.open(downloadUrl);
  }

  // logs admin out of admin pages
  logout():void{
    this.admin.logout();
  }

}
