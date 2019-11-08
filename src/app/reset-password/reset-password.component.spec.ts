import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Output, EventEmitter, Directive } from '@angular/core';

import { StudentService } from '../student.service';

import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  @Directive({
    selector: 'app-admin-sidebar'
  })
  class SidebarMock {
    @Input('buttons')
    @Output('clicker')
    public clickEmitter = new EventEmitter<void>();
  }

  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let StudentMock = jasmine.createSpyObj('StudentService', ['resetStudentPassword']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResetPasswordComponent,
	SidebarMock,
	Component({selector: 'app-navbar', template: ''})(class _ {})
      ],
      providers: [ {provide: StudentService, useValue: StudentMock} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the password when button is pressed', () => {
    const hostElement = fixture.nativeElement;
    let button: HTMLElement = hostElement.querySelector('button');
    let inputs = hostElement.querySelectorAll('input');
    inputs[0].value = "TestRCS";
    inputs[1].value = "TestPass";
    button.click();
    expect(StudentMock.resetStudentPassword).toHaveBeenCalledWith('TestRCS', 'TestPass');
  });
});
