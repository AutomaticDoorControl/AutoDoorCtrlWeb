import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable()
export class StudentService {

  // constructors needed 
  constructor(private http: HttpClient, private router:Router) { }

  // gets active student data from api
  getActive():Observable<any> {

    return this.http.get<any>("http://localhost:8080/api/active_user")
  }

  // gets inactive student data from api
  getRequest():Observable<any> {
    return this.http.get<any>("http://localhost:8080/api/inactive_user")
  }

  // adds studet request to db through api
  register(username):void {
    const headers = new HttpHeaders().set( 'Content-Type', 'application/json');
    let body = JSON.stringify({RCSid:username});
    this.http.post<any>("http://localhost:8080/api/request-access",body,{headers: headers}).subscribe(
      data =>{
        console.log("user added to Database as request");
	window.location.reload();
      },
      err =>{
      console.log("err: issue with server");
      })
  }

  // adds one student to the active student list
  addOne(username):void {
    const headers = new HttpHeaders().set( 'Content-Type', 'application/json');
    let body = JSON.stringify({RCSid:username});
    this.http.post<any>("http://localhost:8080/api/addtoActive",body,{headers: headers}).subscribe(
      data =>{
        console.log("user added to Database as request");
	window.location.reload();
      },
      err =>{
      console.log("err: issue with server");
      })
  }

  // adds all students with request to the active students list
  addAll():void {
    
    this.http.get<any>("http://localhost:8080/api/addAll").subscribe(
      data =>{
        console.log(" All request users added to Database as Active");
	window.location.reload();
      },
      err =>{
      console.log("err: issue with server");
      })
  }
// removes a student from the active student list
  remove(username):void {
    const headers = new HttpHeaders().set( 'Content-Type', 'application/json');
    let body = JSON.stringify({RCSid:username});
    this.http.post<any>("http://localhost:8080/api/remove",body,{headers: headers}).subscribe(
      data =>{
        console.log("user removed from Database");
	window.location.reload();
      },
      err =>{
      console.log("err: issue with server");
      })
  }
// lusts the student complaints stored in the db
  listComplaints():Observable<any>{
    return this.http.get<any>("http://localhost:8080/api/get-complaints")

  }

  // adds student complaint to the db
  submitComplaint(location,message,isLI:boolean):void{
    const headers = new HttpHeaders().set( 'Content-Type', 'application/json');
    let body = JSON.stringify({Location:location, Message:message});
    this.http.post<any>("http://localhost:8080/api/submit-complaint",body,{headers: headers}).subscribe(
      data =>{
        console.log("complaint added to Database as request");
        if(isLI){
          this.router.navigate(['button']);
        }
        else{
          this.router.navigate(['login']);
        }
        
      },
      err =>{
      console.log("err: issue with server");
      })

  }
}
