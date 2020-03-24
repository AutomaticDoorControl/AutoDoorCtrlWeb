import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentService } from '../student.service'; 
import { LoginService } from '../login.service';
import { DownloadCSVService } from '../download-csv.service';

@Component({
	selector: 'app-request-students',
	templateUrl: './request-students.component.html',
	styleUrls: ['./request-students.component.css']
})
export class RequestStudentsComponent implements OnInit {

	Students: any[];
	buttons = ["Add All", "Download"];

	// constructors needed to use the different services 
	constructor(private loginService:LoginService, private studentService:StudentService, private router:Router) { }

	/*On load function calls*/
	ngOnInit() {
		this.getStudents();
	}

	// loads students info into table using student service
	getStudents():void {
		this.studentService.getRequest()
		.subscribe(
			List => {
				this.Students = List
			},
			err => {
				this.loginService.logout();
				this.router.navigate(['login']);
			}
		);
	}

	// adds student to the active students list using student service 
	addStudent(username):void {
		this.studentService.addOne(username);
	}

	// adds all students to the active students list using student service 
	addAll():void {
		this.studentService.addAll();
	}

	//downloads student list in csv file
	downloadCSV():void {
		DownloadCSVService.downloadCSV(this.Students, 'Requests.csv');
	}

	buttonClick(button):void {
		if(button == this.buttons[0])
		{
			this.addAll();
		}
		else if(button == this.buttons[1])
		{
			this.downloadCSV();
		}
	}

}
