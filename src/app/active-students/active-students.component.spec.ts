import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';

import { AdminService } from '../admin.service';
import { StudentService } from '../student.service';
import { ActiveStudentsComponent } from './active-students.component';
import { apiServer } from '../globals';

describe('ActiveStudentsComponent', () => {
  let component: ActiveStudentsComponent;
  let fixture: ComponentFixture<ActiveStudentsComponent>;
  let StudentMock = jasmine.createSpyObj('StudentService', ['getStudents', 'getActive', 'remove', 'logout']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
	HttpClientTestingModule
      ],
      declarations: [ ActiveStudentsComponent ],
      providers: [ AdminService, {provide:StudentService, useValue:StudentMock} ]
    })
    .compileComponents();
    StudentMock.getActive.and.returnValue(
      new Observable( (observer) => {
        observer.next(
	  [{"RCSid":"userOne","Status":"Active"},
	  {"RCSid":"userTwo","Status":"Active"},
	  {"RCSid":"userThree","Status":"Active"},
	  {"RCSid":"userFour","Status":"Active"}]
	)
    }));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make remove request when button is clicked', () => {
    const hostElement = fixture.nativeElement;
    let submitButton: HTMLElement = hostElement.querySelector('button');
    submitButton.click();
    expect(StudentMock.remove).toHaveBeenCalledWith("userOne");
    submitButton = hostElement.querySelectorAll('button')[2];
    submitButton.click();
    expect(StudentMock.remove).toHaveBeenCalledWith("userThree");
  });

});
