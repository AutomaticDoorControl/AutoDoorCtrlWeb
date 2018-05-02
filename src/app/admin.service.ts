import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Http, Response, Headers, } from "@angular/http";
import { Router, CanActivate } from '@angular/router';
import { MessageService } from './message.service';
/*
this service takes care of Administrator logins. Due to issues with the administration about privacy laws
and such, login functionality for students and administrators are currently split between two services
instead of combined into one (students don't have userames and passwords like administrators do)
*/ 



@Injectable()
export class AdminService {

  //constructors needed
  constructor( public router: Router,private http: HttpClient) { }

  admin: any[];

  // checks to see if admin is in our db to be logged in
  login(username,password): boolean {
      const headers = new HttpHeaders().set( 'Content-Type', 'application/json');
      
      let body = JSON.stringify({username:username, password:password});
      console.log('this is username in service',body)
      this.http.post<any>("http://localhost:8080/api/admin/login",body,{headers: headers}).subscribe(
        data =>{ this.admin = data;
                  console.log("this is the admin we get",this.admin);
                  if(this.admin.length>0){
                    
                      localStorage.setItem("admin", this.admin[0].username);
                      console.log("the user set in storage:",localStorage.getItem("admin"));
                      this.router.navigate(['active-students']);
                      return true;
                  }
                  else{
                    
                    return false;
                  }   
        },
        err => {console.log("error on the server")}
      );
     return false;
  }

  // deletes admin from local storage
  logout():void{
    localStorage.removeItem("admin");
    console.log("admin is empty")
    this.router.navigate(['login']);

  }

  // checks if the admin can access route locked pages
  canActivate():boolean {
    if (localStorage.getItem("admin") === null){
      this.router.navigate(['login']);
      return false
    }
    else{
      console.log("current admin: ",localStorage.getItem("admin"));
      return true;
    }
  }
}