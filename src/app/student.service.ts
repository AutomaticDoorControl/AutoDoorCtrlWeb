import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Student } from './student';
import { AStudents } from './mock-students';
import {RStudents} from './mock-addStudents';


@Injectable()
export class StudentService {

  constructor() { }

  getActive():Observable<Student[]> {
    return of(AStudents);
  }

  getRequest():Observable<Student[]> {
    return of(RStudents)
  }

}
