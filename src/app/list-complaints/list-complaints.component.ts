import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {StudentService} from '../student.service';
import {AdminService} from '../admin.service';

import { convertArrayToCSV } from 'convert-array-to-csv';


@Component({
  selector: 'app-list-complaints',
  templateUrl: './list-complaints.component.html',
  styleUrls: ['./list-complaints.component.css']
})
export class ListComplaintsComponent implements OnInit {

  // constructors needed to use the different services 
  constructor(private admin:AdminService, private studentService:StudentService, private router:Router) { }

  Complaints:any[];
  buttons = ["Download"];

  /*On load function calls*/  
  ngOnInit() {
    this.getComplaints();
  }

  //loads complaints onto page using student service
  getComplaints():void{
    this.studentService.listComplaints().subscribe(
      data =>{
        this.Complaints = data;
      },
      err =>{
        this.admin.logout();
	this.router.navigate(['login']);
      })
  }

  //download list of complaints to csv
  downloadCSV():void{
    let csv = convertArrayToCSV(this.Complaints);
    let blob = new Blob([csv], {type: 'text/csv;charset=utf8;'});
    let uri = 'data:attachment/csv;charset=utf-8,' + encodeURI(csv);
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('visibility', 'hidden');
    link.download = 'Complaints.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // logs admin out of admin pages
  logout():void{
    this.admin.logout();
  }

  buttonClick(button):void {
    if(button == this.buttons[0])
      this.downloadCSV();
  }

}
