import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Http, Response, Headers, } from "@angular/http";
import { Router, CanActivate } from '@angular/router';
import { MessageService } from './message.service';
/*
this service takes care of student logins. Due to issues with the administration about privacy laws
and such, login functionality for students and administrators are currently split between two services
instead of combined into one (students don't have userames and passwords like administrators do)
*/ 

@Injectable()
export class LoginService implements CanActivate {

  // constructors needed 
  constructor(public router: Router,private http: HttpClient) { }

  user: any[];

  // Checks if the user is in the db
  login(username): boolean {
      const headers = new HttpHeaders().set( 'Content-Type', 'application/json');
      
      let body = JSON.stringify({RCSid:username});
      console.log('this is username in service',body)
      this.http.post<any>("http://localhost:8080/api/login",body,{headers: headers}).subscribe(
        data =>{ this.user = data;
                  console.log("this is the user we get",this.user);
                  console.log("this is the user status",this.user[0].Status.trim());
                  var stat: string = String(this.user[0].Status.trim());
                  console.log("this is stat", stat);
                  if(this.user.length>0){
                    if(stat === "Active" ){
                      localStorage.setItem("user", this.user[0].RCSid);
                      console.log("the user set in storage:",localStorage.getItem("user"));
                      this.router.navigate(['button']);
                      return true;
                    }
                    else{
                      
                      return false;
                    }
                  }
                  
        },
        err => {console.log("error on the server")}
      );
     return false;
  }
// deletes user from local storage
  logout():void{
    localStorage.removeItem("user");
    console.log("user is empty")
    this.router.navigate(['login']);

  }

  // checks if the student can access pages restricted to logged in users 
  canActivate():boolean {
    if (localStorage.getItem("user") === null){
      console.log("current user: ",localStorage.getItem("user"))
      this.router.navigate(['login']);
      return false
    }
    else{
      return true;
    }
  }
  //checks if student is logged in
  loggedIn():boolean{
    if (localStorage.getItem("user") === null){
      console.log("current user: ",localStorage.getItem("user"))
      return false
    }
    else{
      return true;
    }
  }
}
