import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../login.service';
import { StudentService } from '../student.service'; 

@Component({
	selector: 'app-active-students',
	templateUrl: './active-students.component.html',
	styleUrls: ['./active-students.component.css']
})
export class ActiveStudentsComponent implements OnInit {
	/*variables*/
	Students: any[];

	// constructors needed to use the different services
	constructor(private loginService:LoginService, private studentService:StudentService, private router:Router) { }

	/*On load function calls*/
	ngOnInit() {
		this.getStudents();
	}

	//loads students into table using student service
	getStudents():void {
		this.studentService.getActive()
		.subscribe(
			List => {
				this.Students = List;
			console.log(localStorage.getItem('user'));
			},
			err => {
				console.log("Server error: ", err);
				this.loginService.logout();
				this.router.navigate(['login']);
			}
		);
	}

	//removes a student from the active list using student service
	removeOne(username):void {
		this.studentService.remove(username);
	}
}
