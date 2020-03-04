import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, CanActivate } from '@angular/router';
import { apiServer } from './globals';
/*
this service takes care of student logins. Due to issues with the administration about privacy laws
and such, login functionality for students and administrators are currently split between two services
instead of combined into one (students don't have userames and passwords like administrators do)
 */ 

@Injectable()
export class LoginService implements CanActivate {

	// constructors needed 
	constructor(public router: Router,private http: HttpClient) { }

	// Checks if the user is in the db
	login(username, password, failCallback?): boolean {
		const headers = new HttpHeaders().set( 'Content-Type', 'application/json');
      		let body = JSON.stringify({rcsid:username, password:password});
		this.http.post<any>(apiServer + "/api/login",body,{headers: headers}).subscribe(
			data =>{
				if(data.SESSIONID != ""){
					localStorage.setItem("user", data.SESSIONID);
					localStorage.setItem("isAdmin", data.admin);
					if(data.admin == 1)
					{
						this.router.navigate(['active-students']);
					}
					return true;
				}
				else {
					localStorage.removeItem("user");
					localStorage.removeItem("isAdmin");
					if(failCallback)
					{
						failCallback();
					}
				}
			},
			err => {
				console.error("Server error: ", err);
				localStorage.removeItem("user");
				localStorage.removeItem("isAdmin");
			}
		);
		return false;
	}
	// deletes user from local storage
	logout():void {
		this.http.get<any>(apiServer + "/api/logout").subscribe(
			data =>{
				localStorage.removeItem("user");
				localStorage.removeItem("isAdmin");
				this.router.navigate(['login']);
			},
			err =>{
				console.error("Server error: ", err);
				localStorage.removeItem("user");
				localStorage.removeItem("isAdmin");
				this.router.navigate(['login']);
			});
	}

	// checks if the student can access pages restricted to logged in users 
	canActivate():boolean {
		if (localStorage.getItem("isAdmin") !== "1"){
			this.router.navigate(['login']);
			return false
		}
		return true;
	}

	//checks if student is logged in
	loggedIn():boolean{
		return localStorage.getItem("user") !== null;
	}

	loggedInAdmin():boolean{
		return localStorage.getItem("isAdmin") == "1";
	}

	changePassword(RCSid, oldPass, newPass):void {
		const headers = new HttpHeaders().set('Content-Type', 'application/json');
		let body = JSON.stringify({rcsid:RCSid, password:oldPass, newpass:newPass});
		this.http.post<any>(apiServer + "/api/change_password", body, {headers: headers}).subscribe(
			data => { },
			err => {
				console.error("Server Error: ", err);
			}
		);
	}
}
