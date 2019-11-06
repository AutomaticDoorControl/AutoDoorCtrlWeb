import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Output, EventEmitter, Directive } from '@angular/core';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { AdminService } from '../admin.service';
import { StudentService } from '../student.service';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

import { RequestStudentsComponent } from './request-students.component';

describe('RequestStudentsComponent', () => {
  @Directive({
    selector: 'app-admin-sidebar'
  })
  class SidebarMock {
    @Input('buttons')
    @Output('clicker')
    public clickEmitter = new EventEmitter<void>();
  }

  let component: RequestStudentsComponent;
  let fixture: ComponentFixture<RequestStudentsComponent>;
  let StudentMock = jasmine.createSpyObj('StudentService', ['getRequest', 'addOne', 'addAll', 'logout']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
	HttpClientTestingModule
      ],
      declarations: [
        RequestStudentsComponent,
	SidebarMock,
	Component({selector: 'app-navbar', template: ''})(class _ {})
      ],
      providers: [ AdminService, {provide: StudentService, useValue: StudentMock} ]
    })
    .compileComponents();
    StudentMock.getRequest.and.returnValue(
      new Observable( (observer) => {
        observer.next(
	  [{"RCSid":"userOne","Status":"Request"},
	  {"RCSid":"userTwo","Status":"Request"},
	  {"RCSid":"userThree","Status":"Request"},
	  {"RCSid":"userFour","Status":"Request"}]
	)
    }));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a student when clicked', () => {
    const hostElement = fixture.nativeElement;
    let submitButton: HTMLElement = hostElement.querySelectorAll('button')[0];
    submitButton.click();
    expect(StudentMock.addOne).toHaveBeenCalledWith("userOne");
    submitButton = hostElement.querySelectorAll('button')[2];
    submitButton.click();
    expect(StudentMock.addOne).toHaveBeenCalledWith("userThree");
  });

  it('should populate table with values', () => {
    const hostElement = fixture.nativeElement;
    let table: HTMLElement = hostElement.querySelector('table');
    expect(table.children[1].children[0].innerHTML).toBe('userOne');
    expect(table.children[2].children[0].innerHTML).toBe('userTwo');
    expect(table.children[3].children[0].innerHTML).toBe('userThree');
    expect(table.children[4].children[0].innerHTML).toBe('userFour');
    for(var i = 1; i < 4; ++i)
      expect(table.children[i].children[1].innerHTML).toBe('Request');
  });
});
