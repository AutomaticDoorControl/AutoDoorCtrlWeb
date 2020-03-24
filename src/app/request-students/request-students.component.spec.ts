import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Output, EventEmitter, Directive } from '@angular/core';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { LoginService } from '../login.service';
import { StudentService } from '../student.service';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { DownloadCSVService } from '../download-csv.service';

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
	let LoginMock = jasmine.createSpyObj('LoginService', ['logout']);

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
			providers: [ {provide: LoginService, useValue: LoginMock}, {provide: StudentService, useValue: StudentMock} ]
		})
			.compileComponents();
		StudentMock.getRequest.and.returnValue(
			new Observable( (observer) => {
				observer.next(
					[{"rcsid":"userOne"},
					{"rcsid":"userTwo"},
					{"rcsid":"userThree"},
					{"rcsid":"userFour"}]
				)
			}));
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RequestStudentsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		let CSVSpy = spyOn(DownloadCSVService, 'downloadCSV');
		CSVSpy.calls.reset();
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
	});

	it('should logout on failed request', () => {
		StudentMock.getRequest.and.returnValue(
			new Observable( (observer) => {
				observer.error("Oh no");
			})
		);
		component.getStudents();
		expect(LoginMock.logout).toHaveBeenCalled();
	});


	it('should trigger download when button is clicked', () => {
		StudentMock.addAll.calls.reset();
		component.buttonClick("Download");
		expect(DownloadCSVService.downloadCSV).toHaveBeenCalledWith([
			{"rcsid":"userOne"},
			{"rcsid":"userTwo"},
			{"rcsid":"userThree"},
			{"rcsid":"userFour"}],
			'Requests.csv');
		expect(StudentMock.addAll).not.toHaveBeenCalled();
	});

	it('should trigger add all when button is clicked', () => {
		StudentMock.addAll.calls.reset();
		component.buttonClick('Add All');
		expect(StudentMock.addAll).toHaveBeenCalled();
		expect(DownloadCSVService.downloadCSV).not.toHaveBeenCalled();
	});

	it('should trigger no functions with an unassigned button', () => {
		StudentMock.addAll.calls.reset();
		component.buttonClick('no such button');
		expect(StudentMock.addAll).not.toHaveBeenCalled();
		expect(DownloadCSVService.downloadCSV).not.toHaveBeenCalled();
	});
});
