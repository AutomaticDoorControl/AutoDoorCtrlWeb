import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Output, EventEmitter, Directive } from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';

import { AdminService } from '../admin.service';
import { StudentService } from '../student.service';
import { ActiveStudentsComponent } from './active-students.component';
import { apiServer } from '../globals';

describe('ActiveStudentsComponent', () => {
	@Directive({
		selector: 'app-admin-sidebar'
	})
	class SidebarMock {
		@Input('buttons')
		@Output('clicker')
		public clickEmitter = new EventEmitter<void>();
	}

	let component: ActiveStudentsComponent;
	let fixture: ComponentFixture<ActiveStudentsComponent>;
	let StudentMock = jasmine.createSpyObj('StudentService', ['getStudents', 'getActive', 'remove', 'logout']);
	let AdminMock = jasmine.createSpyObj('AdminService', ['logout']);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				HttpClientTestingModule
			],
			declarations: [
				ActiveStudentsComponent,
				SidebarMock,
				Component({selector: 'app-navbar', template: ''})(class _ {})
			],
			providers: [ {provide: AdminService, useValue: AdminMock}, {provide: StudentService, useValue: StudentMock} ]
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

	it('should populate table with values', () => {
		const hostElement = fixture.nativeElement;
		let table: HTMLElement = hostElement.querySelector('table');
		expect(table.children[1].children[0].innerHTML).toBe('userOne');
		expect(table.children[2].children[0].innerHTML).toBe('userTwo');
		expect(table.children[3].children[0].innerHTML).toBe('userThree');
		expect(table.children[4].children[0].innerHTML).toBe('userFour');
		for(var i = 1; i < 4; ++i)
		{
			expect(table.children[i].children[1].innerHTML).toBe('Active');
		}
	});

	it('should logout on failed request', () => {
		StudentMock.getActive.and.returnValue(
			new Observable( (observer) => {
				observer.error("Oh no");
			})
		);
		component.getStudents();
		expect(AdminMock.logout).toHaveBeenCalled();
	});
});
