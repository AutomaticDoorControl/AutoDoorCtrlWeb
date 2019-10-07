import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminService } from '../admin.service';
import { StudentService } from '../student.service';

import { RequestStudentsComponent } from './request-students.component';

describe('RequestStudentsComponent', () => {
  let component: RequestStudentsComponent;
  let fixture: ComponentFixture<RequestStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
	HttpClientTestingModule
      ],
      declarations: [ RequestStudentsComponent ],
      providers: [ AdminService, StudentService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
