import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Student } from './student';
import { AStudents } from './mock-students';
import {RStudents} from './mock-addStudents';


@Injectable()
export class StudentService {

  constructor(private http: HttpClient) { }

  getActive():Observable<any> {

    return this.http.get<any>("http://localhost:8080/api/active_user")
  }

  getRequest():Observable<any> {
    return this.http.get<any>("http://localhost:8080/api/inactive_user")
  }

}
