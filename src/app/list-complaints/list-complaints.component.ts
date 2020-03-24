import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentService } from '../student.service';
import { LoginService } from '../login.service';
import { DownloadCSVService } from '../download-csv.service';


@Component({
	selector: 'app-list-complaints',
	templateUrl: './list-complaints.component.html',
	styleUrls: ['./list-complaints.component.css']
})
export class ListComplaintsComponent implements OnInit {

	// constructors needed to use the different services 
	constructor(private loginService:LoginService, private studentService:StudentService, private router:Router) { }

	Complaints:any[];
	buttons = ["Download"];

	/*On load function calls*/  
	ngOnInit() {
		this.getComplaints();
	}

	//loads complaints onto page using student service
	getComplaints():void {
		this.studentService.listComplaints().subscribe(
			data => {
				this.Complaints = data;
			},
			err => {
				this.loginService.logout();
				this.router.navigate(['login']);
			})
	}

	//download list of complaints to csv
	downloadCSV():void {
		DownloadCSVService.downloadCSV(this.Complaints, 'Complaints.csv');
	}

	buttonClick(button):void {
		if(button == this.buttons[0])
		{
			this.downloadCSV();
		}
	}

}
