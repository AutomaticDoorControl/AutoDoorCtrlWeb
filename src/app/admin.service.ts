import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Http, Response, Headers, } from "@angular/http";
import { Router, CanActivate } from '@angular/router';
import { MessageService } from './message.service';

@Injectable()
export class AdminService {

  constructor(private messageService: MessageService, public router: Router,private http: HttpClient) { }

  admin: any[];

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
                    this.messageService.add("invalid login.Please Register");
                    return false;
                  }   
        },
        err => {console.log("error on the server")}
      );
     return false;
  }

  logout():void{
    localStorage.removeItem("admin");
    console.log("admin is empty")
    this.router.navigate(['login']);

  }

  // checks if the student can login correctly
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
