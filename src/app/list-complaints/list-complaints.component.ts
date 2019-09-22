import { Component, OnInit } from '@angular/core';
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

}
