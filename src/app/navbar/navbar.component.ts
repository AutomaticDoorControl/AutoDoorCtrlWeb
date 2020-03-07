import { Component, OnInit } from '@angular/core';

import { LoginService } from '../login.service';
import { AdminService } from '../admin.service';
import { StudentService } from '../student.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	constructor(private loginService: LoginService, private adminService: AdminService, private studentService: StudentService) { }

	loggedIn:boolean = false;
	loggedInStudent:boolean = false;
	loggedInAdmin:boolean = false;

	ngOnInit() {
		this.checkLoggedIn();
	}

	checkLoggedIn():void {
		this.loggedInStudent = this.loginService.loggedIn(); 
		this.loggedInAdmin = this.adminService.loggedIn();
		this.loggedIn = this.loggedInStudent || this.loggedInAdmin;
	}

	logout():void {
		if(this.loggedInAdmin)
		{
			this.adminLogout();
		}
		else if(this.loggedInStudent)
		{
			this.studentLogout();
		}
		this.checkLoggedIn();
	}

	studentLogout():void {
		this.loginService.logout();
	}

	adminLogout():void {
		this.adminService.logout();
	}

	// allows students to login via login service
	studentLogin(username, password):void {
		document.getElementById('studentBadRequest').style.visibility = 'collapse';
		this.loginService.login(username, password, this.showFailedStudentLogin, this);
	}

	// allows admin to login using admin service
	adminLogin(username,password):void {
		document.getElementById('adminBadRequest').style.visibility = 'collapse';
		this.adminService.login(username, password, this.showFailedAdminLogin);
	}

	//allows students to register via student service
	studentRegister(username):void {
		this.studentService.register(username);
	}

	changePassword(username, oldPass, newPass):void {
		if(this.loggedInAdmin)
		{
			this.adminService.changePassword(username, oldPass, newPass);
		}
		else if(this.loggedInStudent)
		{
			this.loginService.changePassword(username, oldPass, newPass);
		}
	}

	showFailedStudentLogin():void {
		document.getElementById('studentBadRequest').style.visibility = 'visible';
	}

	showFailedAdminLogin():void {
		document.getElementById('adminBadRequest').style.visibility = 'visible';
	}

	jasmineToString(): string {
		return "Navbar";
	}
}
