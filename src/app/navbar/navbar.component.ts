import { Component, OnInit } from '@angular/core';

import { LoginService } from '../login.service';
import { StudentService } from '../student.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	constructor(private loginService: LoginService, private studentService: StudentService) { }

	loggedIn:boolean = false;
	loggedInAdmin:boolean = false;

	ngOnInit() {
		this.checkLoggedIn();
	}

	checkLoggedIn():void {
		this.loggedIn = this.loginService.loggedIn(); 
		this.loggedInAdmin = this.loginService.loggedInAdmin();
	}

	logout():void {
		this.loginService.logout();
		this.checkLoggedIn();
	}

	// allows students to login via login service
	login(username, password):void {
		document.getElementById('badLogin').style.visibility = 'collapse';
		this.loginService.login(username, password, this.showFailedLogin);
	}

	//allows students to register via student service
	studentRegister(username):void {
		this.studentService.register(username);
	}

	changePassword(username, oldPass, newPass):void {
		this.loginService.changePassword(username, oldPass, newPass);
	}

	showFailedLogin():void {
		document.getElementById('badLogin').style.visibility = 'visible';
	}
}
