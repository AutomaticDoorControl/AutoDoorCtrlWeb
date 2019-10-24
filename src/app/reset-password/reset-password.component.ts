import { Component, OnInit } from '@angular/core';

import { StudentService } from '../student.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private studentService: StudentService) { }

  ngOnInit() {
  }

  resetPassword(RCSid, newPass):void {
    this.studentService.resetStudentPassword(RCSid, newPass);
  }

}
