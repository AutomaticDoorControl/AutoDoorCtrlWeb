import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentService } from '../student.service';
import { LoginService } from '../login.service'

@Component({
	selector: 'app-submit-complaint',
	templateUrl: './submit-complaint.component.html',
	styleUrls: ['./submit-complaint.component.css']
})
export class SubmitComplaintComponent implements OnInit {
	// constructors needed to use the different services 
	constructor(private studentService:StudentService, private loginService:LoginService, public router:Router) { }

	/*On load function calls*/  
	ngOnInit() {
	}

	//submits the complaint to the db using student service
	submit(location, message):void{
		this.studentService.submitComplaint(location, message);
	}

}
